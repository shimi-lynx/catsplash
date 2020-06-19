<template>
  <div class="columns is-centered is-marginless">
    <div class="column is-one-quarter"></div>
    <div class="column is-half">
      <b-message
        class="b-message__overlay"
        title="posting photo"
        :active.sync="isActive"
        :closable="false"
        aria-close-label="Close message"
        type="is-warning"
      >
        <div class="content">
          <div class="columns is-centered is-marginless" @change="onFileChange">
            <div class="columns is-marginless" v-if="!preview">
              <b-field>
                <b-upload multiple drag-drop>
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>
                        <b-icon icon="upload" size="is-large"></b-icon>
                      </p>
                      <p>画像をドロップ またはクリックして画像を選択</p>
                    </div>
                  </section>
                </b-upload>
              </b-field>
            </div>
            <div class="columns has-text-centered is-marginless">
              <output class="column trim img" v-if="preview">
                <img :src="preview" alt />
              </output>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column is-one-quarter">
              <b-button type="is-warning" v-if="preview" @click="reset">キャンセル</b-button>
            </div>
            <div class="column is-one-quarter"></div>
            <div class="column is-one-quarter">
              <b-button type="is-dark" v-if="preview" @click="submit">送信</b-button>
            </div>
          </div>
        </div>
      </b-message>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      preview: null,
      targetPhoto: null,
      isPhotoFormActive: this.isActive,
      limitFileSize: 512000,
      sendPhotoDataToDB: {
        photo: {
          account_id: null,
          filename: null
        }
      }
    };
  },
  methods: {
    onFileChange(event) {
      // 何も選択されていなかったら処理中断
      if (event.target.files.length === 0) {
        this.reset();
        this.$store.dispatch("toast/error", "何も選択されませんでした！");
        return false;
      }

      // ファイルが画像ではなかったら処理中断
      if (!event.target.files[0].type.match("image.*")) {
        this.reset();
        this.$store.dispatch("toast/error", "画像以外が選択されています！");
        return false;
      }

      // ファイルサイズが500KB以上だったら処理中断
      if (event.target.files[0].size >= this.limitFileSize) {
        this.reset();
        this.$store.dispatch(
          "toast/error",
          "ファイルサイズの上限は500KBです！"
        );
        return false;
      }

      // FileReaderクラスのインスタンスを取得
      const reader = new FileReader();

      // ファイルを読み込み終わったタイミングで実行する処理
      reader.onload = e => {
        this.preview = e.target.result;
      };

      // ファイルを読み込む
      reader.readAsDataURL(event.target.files[0]);

      // 写真をdataにセット
      this.targetPhoto = event.target.files[0];
    },
    reset() {
      this.preview = "";
      this.$el.querySelector('input[type="file"]').value = null;
    },
    async submit() {
      // presigned_postを呼び出してS3へ送る情報を含むエンドポイントを取得
      const presignedObject = await axios
        .get(`/photos/s3?filename=${this.targetPhoto.name}`)
        .then(response => response.data)
        .catch(e => console.log(e.message));

      // formDataの作成
      const formData = new FormData();
      for (const key in presignedObject.fields) {
        formData.append(key, presignedObject.fields[key]);
      }
      // input[type=file] に持たせているデータを取得して送信する formData に追加する
      formData.append("file", this.targetPhoto);

      // アップロード実施
      // presigned-url エンドポイントから取得したオブジェクトのURLと、作成したformDataを送信するとアップロードができる
      await axios
        .post(presignedObject.url, formData, {
          headers: {
            accept: "multipart/form-data"
          }
        })
        .then(response => {
          // XML形式でデータが返却される。アップロードに成功すると Location というタグの中に入っているので、
          // この値をURLとして取得して使う
          const matchedObject = response.data.match(
            /<Location>(.*?)<\/Location>/
          );
          const s3Url = unescape(matchedObject[1]);
          // photosテーブルへ保存する JSONデータの作成
          this.sendPhotoDataToDB.photo.account_id = this.$store.state.auth.user.data.id;
          this.sendPhotoDataToDB.photo.filename = s3Url.replace(
            process.env.VUE_APP_S3_URL,
            ""
          );
        })
        .catch(e => console.log(e.message));

      // DBにデータを保存
      this.doSendPhotoData();
      // プレビュー画像を削除
      this.reset();
      // フォーム画面を閉じる
      this.closeForm();
    },
    async doSendPhotoData() {
      await axios
        .post("/photos", this.sendPhotoDataToDB)
        .then(response => console.log(response));
    },
    closeForm() {
      this.$parent.isActive = false;
    }
  }
};
</script>

<style scoped>
.trim img {
  max-width: 300px;
  max-height: 300px;
  width: auto;
  height: auto;
}

.b-message__overlay {
  z-index: 1;
  position: fixed;
}
</style>
