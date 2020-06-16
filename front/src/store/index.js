import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./auth.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  },
  plugins: [
    createPersistedState({
      key: "AuthData",
      paths: ["auth.user", "auth.header"],
      storage: window.sessionStorage
    })
  ]
});
