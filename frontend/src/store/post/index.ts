import { createPost, loadPosts, likePost, favorPost } from "../../apis/post";
import type { RootState, AugmentedActionContext } from "../index";
import type { Commit, MutationTree, ActionTree } from "vuex";
export interface postState {
  list: Array<any>; //posts
  searchResult: Array<any>;
  currentId: number | null;
}
//
export enum ActionTypes {
  UP_LOAD_POST = "UP_LOAD_POST",
  LOAD_ALL_POSTS = "LOAD_ALL_POSTS",
  TOGGLE_LIKE = "TOGGLE_LIKE",
  TOGGLE_FAVOR = "TOGGLE_FAVOR",
  SHOW_POST_DETAILS = "SHOW_POST_DETAILS",
  HIDE_POST_DETAILS = "HIDE_POST_DETAILS",
  SEARCH_POSTS = "SEARCH_POSTS"
}

export type Actions = {
  [ActionTypes.UP_LOAD_POST](
    { commit, dispatch }: AugmentedActionContext,
    { image, description }
  ): void;
  [ActionTypes.LOAD_ALL_POSTS]({ commit }: AugmentedActionContext): void;
  [ActionTypes.TOGGLE_LIKE](
    { commit }: AugmentedActionContext,
    id: number
  ): void;
  [ActionTypes.TOGGLE_FAVOR](
    { commit }: AugmentedActionContext,
    id: number
  ): void;
  [ActionTypes.SHOW_POST_DETAILS](
    { commit, dispatch }: AugmentedActionContext,
    id: number
  ): void;
  [ActionTypes.HIDE_POST_DETAILS]({ commit }: AugmentedActionContext): void;
  [ActionTypes.SEARCH_POSTS](
    { commit }: AugmentedActionContext,
    term: string
  ): void;
};

export const postActions = {
  [ActionTypes.SHOW_POST_DETAILS]({ commit, dispatch }, id) {
    commit("setCurrentId", id);
    dispatch("loadAllComments", id);
    commit("changeShowPostDetails", true);
  }
};
//
export const post = {
  state(): postState {
    return {
      list: [], //posts
      searchResult: [],
      currentId: null
    };
  },
  mutations: {
    initializePosts(state: postState, posts) {
      state.list = posts;
    },
    toggleLike(state: postState, { id, isLike }) {
      const post = state.list.find((post) => post.id === id);
      if (isLike) {
        post.liked_bies = (post.liked_bies || 0) + 1; //避免undefined +1
      } else {
        post.liked_bies--;
      }
      post.likedByMe = isLike;
    },
    toggleFavor(state: postState, { id, isFavor }) {
      const post = state.list.find((post) => post.id === id);
      if (isFavor) {
        post.favored_bies = (post.favored_bies || 0) + 1; //避免undefined +1
      } else {
        post.favored_bies--;
      }
      post.favoredByMe = isFavor;
    },
    setCurrentId(state: postState, id) {
      state.currentId = id;
    },
    increaseCommentCount(state: postState, id) {
      const post = state.list.find((post) => post.id === id);
      post.comments++;
    },
    setPostsSearchResult(state: postState, posts) {
      state.searchResult = posts;
    }
  },
  actions: {
    async uploadPost({ commit, dispatch }, { image, description }) {
      await createPost(image, description);
      dispatch("loadAllPosts");
      // 關閉頁面
      commit("changeShowPostUpload", false);
    },
    async loadAllPosts({ commit }) {
      const posts = await loadPosts();
      commit("initializePosts", posts);
    },
    async toggleLike({ commit }, id) {
      const isLike = await likePost(id);
      commit("toggleLike", { id, isLike });
    },
    async toggleFavor({ commit }, id) {
      const isFavor = await favorPost(id);
      commit("toggleFavor", { id, isFavor });
    },
    async showPostDetails({ commit, dispatch }, id) {
      commit("setCurrentId", id);
      dispatch("loadAllComments", id);
      commit("changeShowPostDetails", true);
    },
    async hidePostDetails({ commit }) {
      commit("setCurrentId", null);
      commit("changeShowPostDetails", false);
    },
    async searchPosts({ commit }, term) {
      const posts = await loadPosts("filters[description][$contains]=" + term);
      commit("setPostsSearchResult", posts);
    }
  },
  getters: {
    postDetails(state) {
      return state.list.find((post) => post.id === state.currentId);
    }
  }
};
