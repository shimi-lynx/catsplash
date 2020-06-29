import axios from "axios";
import store from "./store/auth";

export default function setup() {
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

  // login後にauthストアのヘッダーがセットされていたらaxios の全リクエストのヘッダにトークンを差し込む設定する
  axios.interceptors.request.use(
    function(config) {
      if (store.state.header) {
        config.headers = store.state.header;
      }

      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
  );
}
