<template>
  <div>
    <b-navbar type="is-dark">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }" style="font-size:30px;">CatSplash</b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item v-if="isLogin" tag="div">
          <div class="button block" @click="isActive = !isActive">
            <b-icon icon="paw"></b-icon>
            <div>Posting Photo</div>
          </div>
        </b-navbar-item>
        <b-navbar-item v-if="isLogin" tag="div">
          <div style="padding-right: 10px;">{{this.$store.state.auth.user.data.email}}</div>
          <div class="buttons">
            <a class="button is-warning" @click="logout">
              <b-icon icon="logout"></b-icon>
            </a>
          </div>
        </b-navbar-item>
        <b-navbar-item v-else tag="div">
          <div class="buttons">
            <a class="button is-light" @click="toLoginPage">Log in / Sign up</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <!-- <div class="columns is-centered is-marginless">
      <div class="column is-one-quarter"></div>
      <div class="column is-half">
        <b-message
          title="posting photo"
          :active.sync="isActive"
          aria-close-label="Close message"
          type="is-warning"
        >
          <input />
        </b-message>
      </div>
    </div>-->
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
    }
  },
  computed: {
    ...mapGetters({ isLogin: "auth/isLogin" })
  },
  components: {
    PostPhotoForm
  }
};
</script>
