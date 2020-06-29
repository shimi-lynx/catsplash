<template>
  <div>
    <figure class="figure__target">
      <img :src="`${s3url}${item.filename}`" />
      <div class="figure__background">
        <div class="owner">
          <div class="content">{{item.account.name}}</div>
        </div>
        <div class="like_button" @click="onLikeClick">
          <div class="button block">
            <b-icon
              icon="cards-heart"
              :type="{'is-danger': item.is_like}"
              :class="{'rotateY720': item.is_like }"
            ></b-icon>
            <div>{{item.likes_count}}</div>
          </div>
        </div>
      </div>
    </figure>
    <div class="is_img_padding"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["item"],
  data() {
    return {
      s3url: process.env.VUE_APP_S3_URL,
      isActive: false
    };
  },
  methods: {
    onLikeClick() {
      // ログインチェック
      if (!this.$store.state.auth.header) {
        this.$store.dispatch(
          "toast/info",
          "いいね！ はログイン時のみご利用頂けます"
        );
        return false;
      }

      // axiosのパラメータを定義
      const sendLikeData = {
        like: {
          account_id: this.$store.state.auth.user.data.id,
          photo_id: this.item.id
        }
      };

      // いいね解除・いいねの処理
      if (this.item.is_like) {
        axios
          .delete(`/photos/like`, {
            data: sendLikeData
          })
          .then(() => {
            this.item.is_like = false;
            this.item.likes_count -= 1;
          })
          .catch(error => {
            this.$store.dispatch("toast/error", "いいね解除に失敗しました");
            console.log(error);
          });
      } else {
        axios
          .post(`/photos/like`, sendLikeData)
          .then(() => {
            this.item.is_like = true;
            this.item.likes_count += 1;
          })
          .catch(error => {
            this.$store.dispatch("toast/error", "いいねに失敗しました");
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
.figure__target {
  position: relative;
  vertical-align: bottom;
  line-height: 0em;
}

.is_img_padding {
  padding-bottom: 16px;
}

.like_button {
  position: absolute;
  top: 100%;
  left: 100%;
  transform: translateY(-130%) translateX(-130%);
  -webkit-transform: translateY(-130%) translateX(-130%);
  opacity: 0;
  visibility: hidden;
}

.owner {
  position: absolute;
  top: 0%;
  left: 0%;
  transform: translateY(20px) translateX(20px);
  -webkit-transform: translateY(20px) translateX(20px);
  transition: all 0.4s ease;
  opacity: 0;
  visibility: hidden;
  color: #fff;
}

.rotateY720 {
  transition: all 0.6s;
  transform: rotateY(720deg);
}

.figure__target:hover .like_button {
  opacity: 1;
  visibility: visible;
  transition: all 0.4s ease;
  z-index: 1;
}

.figure__target:hover .figure__background {
  opacity: 1;
  visibility: visible;
  transition: all 0.4s ease;
  z-index: 1;
}

.figure__target:hover .owner {
  opacity: 1;
  visibility: visible;
  z-index: 1;
}

.figure__background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
