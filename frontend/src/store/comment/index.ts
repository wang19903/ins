import { createComment, loadComments } from "../../apis/comment";
// import { ActionContext } from "vuex";
// import { MutationTree } from "vuex";

export interface commentState {
  list: Array<Object>;
}

// export enum MutationsTypes{
//   INITIALIZECOMMENTS= "INITIALIZECOMMENTS"
// }

// export type Mutations<S = CommentState> = {
//   [MutationsTypes.INITIALIZECOMMENTS](state:S, comments:Array<Object>):void
// }

// export const mutations:MutationTree<CommentState>&Mutations = {
//   [MutationsTypes.INITIALIZECOMMENTS](state,comments:Array<Object>){
//     state.list = comments;
//   }
// }

export const comment = {
  state(): commentState {
    return {
      list: []
    };
  },
  mutations: {
    initializeComments(state, comments) {
      state.list = comments;
    }
  },
  actions: {
    async addComment({ commit, dispatch }: ActionContext, { content, postId }) {
      await createComment(content, postId);
      dispatch("loadAllComments", postId);
      commit("increaseCommentCount", postId);
    },
    async loadAllComments({ commit }, postId) {
      const comments = await loadComments(postId);
      commit("initializeComments", comments);
    }
  }
};
