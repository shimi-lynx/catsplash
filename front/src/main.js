import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

// sessionStorage にトークンのヘッダがあったらaxios の全リクエストのヘッダにトークンを差し込む設定する
if (sessionStorage.AuthData) {
  const strageData = JSON.parse(sessionStorage.getItem("AuthData"));

  if (strageData.auth.header) {
    axios.interceptors.request.use(function(config) {
      config.headers = strageData.auth.header;

      return config;
    });
  }
}

Vue.use(Buefy);

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
