<template>
  <div class="container is-fluid">
    <div class="columns is-centered is-marginless">
      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <h1 class="title">ユーザ登録</h1>
            <b-field label="メールアドレス">
              <b-input type="email" v-model="RegisterData.email" />
            </b-field>
            <b-field label="パスワード">
              <b-input type="password" password-reveal v-model="RegisterData.password" />
            </b-field>
            <b-field label="パスワード（確認）">
              <b-input
                type="password"
                password-reveal
                v-model="RegisterData.password_confirmation"
              />
            </b-field>
            <b-button type="is-success" @click="accountRegister">登録</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpResponse from "../constant.js";

export default {
  data() {
    return {
      RegisterData: {
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    async accountRegister() {
      await this.$store
        .dispatch("auth/accountRegister", this.RegisterData)
        .catch(e => console.log(e));

      // ユーザ登録API成功なら画面遷移
      if (this.$store.state.auth.httpresponse === httpResponse.SUCCSESS) {
        this.$router.push("/auth/confirm", () => {});
      }
    }
  }
};
</script>
