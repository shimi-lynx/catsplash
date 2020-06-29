import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "@mdi/font/css/materialdesignicons.css";
import interceptorsSetup from "./interceptors";

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

// loginした後にauth ヘッダー情報をaxiosのインターセプターでセットする処理
interceptorsSetup();

Vue.use(Buefy);

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
