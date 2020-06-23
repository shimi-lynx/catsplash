<template>
  <div class="container is-fluid">
    <div class="columns is-centered is-marginless">
      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <h1 class="title">ログイン</h1>
            <b-field label="メールアドレス">
              <b-input type="email" v-model="LoginData.email" />
            </b-field>
            <b-field label="パスワード">
              <b-input type="password" password-reveal v-model="LoginData.password" />
            </b-field>
            <b-button type="is-success" @click="login">Log in</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      LoginData: {
        email: "hoge@email.com",
        password: "password"
      }
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("auth/login", this.LoginData);
      this.$router.push("/");
    }
  }
};
</script>
