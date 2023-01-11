import { createComment, loadComments } from "../../apis/comment";

export const comment = {
  state() {
    return {
      list: [],
    };
  },
  mutations: {
    initializeComments(state, comments) {
      state.list = comments;
    },
  },
  actions: {
    async addComment({ commit, dispatch }, { content, postId }) {
      await createComment(content, postId);
      dispatch("loadAllComments", postId);
      commit("increaseCommentCount", postId);
    },
    async loadAllComments({ commit }, postId) {
      const comments = await loadComments(postId);
      commit("initializeComments", comments);
    },
  },
};
