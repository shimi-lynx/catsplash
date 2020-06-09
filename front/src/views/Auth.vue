<template>
  <div class="content">
    <b-tabs v-model="activeTab" position="is-centered" type="is-toggle">
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
  }
};
</script>
