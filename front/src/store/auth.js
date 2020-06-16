import axios from "axios";

// let initUserData = () => {
//   if (sessionStorage.AuthData) {
//     const strageData = JSON.parse(sessionStorage.getItem("AuthData"));
//     if (strageData.auth.user) {
//       return strageData.auth.user;
//     }
//   }
// };

const state = {
  // user: initUserData(),
  user: null,
  header: null
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
  }
};

const actions = {
  async accountRegister(context, data) {
    const apiResponse = await axios.post("/auth", data);
    console.log(apiResponse.headers["access-token"]);
    context.commit("setUser", apiResponse.data);
    context.commit("setHeader", apiResponse.headers);
  },
  async login(context, data) {
    const apiResponse = await axios.post("/auth/sign_in", data);
    context.commit("setUser", apiResponse.data);
    context.commit("setHeader", apiResponse.headers);
    console.log(apiResponse);
  },
  async logout(context) {
    const apiResponse = await axios.delete("/auth/sign_out", {
      headers: state.header
    });
    context.commit("setHeader", null);
    context.commit("setUser", null);
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
