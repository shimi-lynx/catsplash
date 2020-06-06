<template>
  <div>
    <h3>ユーザ登録</h3>
    <label for="email">メールアドレス:</label>
    <input id="email" v-model="email" />
    <br />
    <br />
    <label for="password">パスワード:</label>
    <input id="password" v-model="password" />
    <br />
    <br />
    <label for="password_confirmation">パスワード（確認）:</label>
    <input id="password_confirmation" v-model="password_confirmation" />
    <br />
    <br />
    <button @click="accountRegister">登録</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    accountRegister() {
      axios
        .post("/auth", {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then(response => {
          console.log(response.headers);
        });
    }
  }
};
</script>
