import { ToastProgrammatic as Toast } from "buefy";

const state = {
  message: null
};

const getters = {};

const mutations = {
  setMessage(state, message) {
    state.message = message;
  }
};

const actions = {
  async success(context, message) {
    context.commit("setMessage", message);
    Toast.open({
      duration: 5000,
      message: message,
      type: "is-success"
    });
  },
  async error(context, message) {
    context.commit("setMessage", message);
    Toast.open({
      duration: 5000,
      message: message,
      type: "is-danger"
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
