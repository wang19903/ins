import { createComment, loadComments } from "../../apis/comment";
import { RootState } from "../index";
import { ActionContext, Module } from "vuex";

export interface CommentState {
  list: Comment[],
}

export interface Comment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
}

export const comment : Module<CommentState, RootState> =  {
  state(): CommentState {
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
    async addComment(context: ActionContext<CommentState, RootState>, { content, postId }:{content:string, postId:number}) {
      await createComment(content, postId);
      context.dispatch("loadAllComments", postId);
      context.commit("increaseCommentCount", postId);
    },
    async loadAllComments(context: ActionContext<CommentState, RootState>, postId:number) {
      const comments = await loadComments(postId);
      context.commit("initializeComments", comments);
    },
  },
};
