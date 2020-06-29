<template>
  <div class="content">
    <div v-if="is_account_confirmation_success">{{ success() }}</div>
    <b-tabs position="is-centered" type="is-toggle">
      <b-tab-item label="ログイン">
        <LoginForm></LoginForm>
      </b-tab-item>

      <b-tab-item label="ユーザ登録">
        <RegisterForm></RegisterForm>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import RegisterForm from "../components/RegisterForm.vue";
import LoginForm from "../components/LoginForm.vue";

export default {
  components: {
    RegisterForm,
    LoginForm
  },
  data() {
    return {
      is_account_confirmation_success: this.$route.query
        .account_confirmation_success
    };
  },
  methods: {
    success() {
      this.$buefy.toast.open({
        duration: 10000,
        message: "アカウントが有効化に成功！いつでもログイン出来ます！！",
        type: "is-success"
      });
    }
  }
};
</script>
