import { createStore } from "vuex";

import { user } from "./user";
import { post } from "./post";
import { comment } from "./comment";

export const store = createStore({
  modules: {
    user,
    post,
    comment
  },
  state() {
    return {
      showPostUpload: false,
      showPostDetails: false,
      messages: ""
    };
  },
  mutations: {
    changeShowPostUpload(state, show) {
      state.showPostUpload = show;
    },
    changeShowPostDetails(state, show) {
      state.showPostDetails = show;
    },
    messagesPush(state, message) {
      console.log(message, 11);
      state.messages = message;
    },
    messageRemove(state) {
      state.messages = "";
    }
  },
  actions: {
    messageAlert({ commit }, payload) {
      console.log(payload, "messageAlert");
      commit("messagesPush", payload);
      setTimeout(() => {
        commit("messageRemove");
      }, 1000);
    }
  }
});
