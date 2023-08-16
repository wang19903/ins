import { createStore } from "vuex";
import { user,UserState } from "./user";
import { post,PostState } from "./post";
import { comment,CommentState } from "./comment";

export interface RootState {
  user: UserState;
  post: PostState;
  comment: CommentState;
  showPostUpload: boolean;
  showPostDetails: boolean;
  messages: string;
}

export default createStore<RootState>({
  modules: {
    user,
    post,
    comment
  },
  state: {
      showPostUpload: false,
      showPostDetails: false,
      messages: "",
      user: {}as RootState["user"],
      post: {}as RootState["post"],
      comment: {}as RootState["comment"]
  },
  mutations: {
    changeShowPostUpload(state:RootState, show:boolean) {
      state.showPostUpload = show;
    },
    changeShowPostDetails(state:RootState, show:boolean) {
      state.showPostDetails = show;
    },
    messagesPush(state:RootState, message:string) {
      console.log(message, "messagesPush");
      state.messages = message;
    },
    messageRemove(state:RootState) {
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
