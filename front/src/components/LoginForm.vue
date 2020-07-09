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
            <div class="columns">
              <div class="column is-4">
                <b-button type="is-success" @click="login">Log in</b-button>
              </div>
              <div class="column is-4 is-offset-4 has-text-right">
                <b-button type="is-warning" @click="easyLogin">簡単Log in</b-button>
              </div>
            </div>
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
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("auth/login", this.LoginData);
      this.$router.push("/");
    },
    async easyLogin() {
      const easyLoginData = {
        email: "guest@email.com",
        password: "password"
      };
      await this.$store.dispatch("auth/login", easyLoginData);
      this.$router.push("/");
    }
  }
};
</script>
