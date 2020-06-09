<template>
  <div>
    <b-navbar type="is-dark">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }" style="font-size:30px;">CatSplash</b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item v-if="isLogin" tag="div">
          <div style="padding-right: 10px;">{{this.$store.state.auth.user.data.email}}</div>
          <div class="buttons">
            <a class="button is-warning" @click="logout">Log out</a>
          </div>
        </b-navbar-item>
        <b-navbar-item v-else tag="div">
          <div class="buttons">
            <a class="button is-light" @click="toLoginPage">Log in / Sign up</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    toLoginPage() {
      this.$router.push("/auth", () => {});
    },
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/", () => {});
    }
  },
  computed: {
    ...mapGetters({ isLogin: "auth/isLogin" })
  }
};
</script>