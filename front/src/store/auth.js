import axios from "axios";
import httpResponse from "../constant.js";

const state = {
  user: null,
  header: null,
  httpresponse: null
};

const getters = {
  isLogin: state => !!state.user
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setHeader(state, header) {
    state.header = header;
  },
  setHttpresponse(state, code) {
    state.httpresponse = code;
  }
};

const actions = {
  async accountRegister(context, data) {
    await axios
      .post("/auth", data)
      .then(response => {
        console.log(response);
        context.commit("setHttpresponse", response.status);
      })
      .catch(e => {
        context.dispatch("toast/error", "入力内容に不備があります", {
          root: true
        });
        console.log(e.message);
      });
  },
  async login(context, data) {
    const apiResponse = await axios.post("/auth/sign_in", data).catch(e => {
      // 認証エラーの処理
      if (e.response.status === httpResponse.UN_AUTHORIZED) {
        context.dispatch(
          "toast/error",
          "メールアドレスまたはパスワードに誤りがあります",
          { root: true }
        );
      } else {
        context.dispatch("toast/error", "ログインに失敗しました", {
          root: true
        });
      }
      console.log(e.response);
    });
    context.commit("setUser", apiResponse.data);
    context.commit("setHeader", apiResponse.headers);
    context.dispatch("toast/success", "ログインしました", { root: true });
    console.log(apiResponse);
  },
  async logout(context) {
    const apiResponse = await axios
      .delete("/auth/sign_out", {
        headers: state.header
      })
      .catch(e => console.log(e.message));
    context.commit("setHeader", null);
    context.commit("setUser", null);
    context.dispatch("toast/success", "ログアウトしました", { root: true });
    console.log(apiResponse);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
