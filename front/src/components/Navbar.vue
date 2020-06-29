<template>
  <div>
    <b-navbar type="is-dark" fixed-top="true">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }" style="font-size:28px;">CatSplash</b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="button block" @click="onPostingPhotoClick">
            <b-icon icon="paw"></b-icon>
            <div>Posting Photo</div>
          </div>
        </b-navbar-item>
        <div class="column is-2 is-marginless"></div>
        <b-navbar-item v-if="isLogin" tag="div">
          <div style="padding-right: 10px;">{{currentUser}}</div>
          <b-tooltip label="ログアウト" type="is-light" position="is-bottom">
            <div class="buttons">
              <a class="button is-warning" @click="logout">
                <b-icon icon="logout"></b-icon>
              </a>
            </div>
          </b-tooltip>
        </b-navbar-item>
        <b-navbar-item v-else tag="div">
          <div class="buttons">
            <a class="button is-light" @click="toLoginPage">Log in / Sign up</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <!-- 写真投稿フォームコンポーネント -->
    <PostPhotoForm :isActive="isActive" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostPhotoForm from "./PostPhotoForm.vue";

export default {
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    toLoginPage() {
      this.$router.push("/auth", () => {});
    },
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/", () => {});
    },
    onPostingPhotoClick() {
      if (!this.isLogin) {
        this.$store.dispatch(
          "toast/info",
          "写真投稿はログイン時のみご利用頂けます"
        );
        return false;
      }
      this.isActive = !this.isActive;
    }
  },
  computed: {
    ...mapGetters({ isLogin: "auth/isLogin", currentUser: "auth/currentUser" })
  },
  components: {
    PostPhotoForm
  }
};
</script>
