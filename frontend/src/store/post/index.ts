import { createPost, loadPosts, likePost, favorPost } from "../../apis/post";
import { Module,ActionContext,GetterTree } from "vuex";
import { RootState } from "../index";

interface Post {
  id: number;
  title: string;
  content: string;
  liked_bies?: number;
  favored_bies?: number;
  likedByMe?: boolean;
  favoredByMe?: boolean;
  comments: number;
}

export interface PostState {
  list: Post[];
  searchResult: Post[];
  currentId: number | null;
}

export const post: Module<PostState, RootState> = {
  state(): PostState {
    return {
      list: [],
      searchResult: [],
      currentId: null
    };
  },
  mutations: {
    initializePosts(state, posts) {
      state.list = posts;
    },
    toggleLike(state, { id, isLike }:{ id:number, isLike:boolean }) {
      const post = state.list.find((post) => post.id === id);
      if (isLike) {
        post.liked_bies = (post.liked_bies || 0) + 1; //避免undefined +1
      } else {
        post.liked_bies--;
      }
      post.likedByMe = isLike;
    },
    toggleFavor(state, { id, isFavor }: { id: number; isFavor: boolean }) {
      const post = state.list.find((post) => post.id === id);
      if (isFavor) {
        post.favored_bies = (post.favored_bies || 0) + 1; //避免undefined +1
      } else {
        post.favored_bies--;
      }
      post.favoredByMe = isFavor;
    },
    setCurrentId(state, id) {
      state.currentId = id;
    },
    increaseCommentCount(state, id) {
      const post = state.list.find((post) => post.id === id);
      post.comments++;
    },
    setPostsSearchResult(state, posts) {
      state.searchResult = posts;
    }
  },
  actions: {
    async uploadPost(context: ActionContext<PostState, RootState>, { image, description }: { image: File; description: string }) {
      await createPost(image, description);
      context.dispatch("loadAllPosts");
      // 關閉頁面
      context.commit("changeShowPostUpload", false);
    },
    async loadAllPosts(context: ActionContext<PostState, RootState>) {
      const posts = await loadPosts();
      context.commit("initializePosts", posts);
    },
    async toggleLike(context: ActionContext<PostState, RootState>, id:number) {
      const isLike = await likePost(id);
      context.commit("toggleLike", { id, isLike });
    },
    async toggleFavor(context: ActionContext<PostState, RootState>, id:number) {
      const isFavor = await favorPost(id);
      context.commit("toggleFavor", { id, isFavor });
    },
    async showPostDetails(context: ActionContext<PostState, RootState>, id:number) {
      context.commit("setCurrentId", id);
      context.dispatch("loadAllComments", id);
      context.commit("changeShowPostDetails", true);
    },
    async hidePostDetails(context: ActionContext<PostState, RootState>) {
      context.commit("setCurrentId", null);
      context.commit("changeShowPostDetails", false);
    },
    async searchPosts(context: ActionContext<PostState, RootState>, term:string) {
      const posts = await loadPosts("filters[description][$contains]=" + term);
      context.commit("setPostsSearchResult", posts);
    }
  },
  getters: {
    postDetails(state: PostState): Post | undefined {
      return state.list.find((post) => post.id === state.currentId);
    }
  } as GetterTree<PostState, RootState>
};
