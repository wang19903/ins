import { createPost, loadPosts, likePost, favorPost } from "../../apis/post";

export interface postState {
  list: Array<any>; //posts
  searchResult: Array<any>;
  currentId: null;
}
//
export enum ActionTypes {
  SHOWPOSTDETAILS = "SHOWPOSTDETAILS"
}
export const pActions = {
  [ActionTypes.SHOWPOSTDETAILS]({ commit, dispatch }, id) {
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
