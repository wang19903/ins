import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions
} from "vuex";
import { InjectionKey } from "vue";
import { user } from "./user";
import { post } from "./post";
import { comment } from "./comment";
import { state, State } from "./state";
import { Mutations, mutations } from "./mutations";
import { Actions, actions } from "./actions";

// define injection key
export const key: InjectionKey<Store> = Symbol();

export const store = createStore<State>({
  modules: {
    user,
    post,
    comment
  },
  state,
  mutations,
  actions
});

export function useStore() {
  return store as Store;
}

//固定寫法
export type Store = Omit<
  VuexStore<State>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};
//沒getters
//  & {
//   getters: {
//     [K in keyof Getters]: ReturnType<Getters[K]>;
//   };
// };
//================================================
//   state() {
//     return {
//       showPostUpload: false,
//       showPostDetails: false,
//       messages: ""
//     };
//   },
//   mutations: {
//     changeShowPostUpload(state, show: boolean) {
//       state.showPostUpload = show;
//     },
//     changeShowPostDetails(state, show: boolean) {
//       state.showPostDetails = show;
//     },
//     messagesPush(state, message: string) {
//       console.log(message, 11);
//       state.messages = message;
//     },
//     messageRemove(state) {
//       state.messages = "";
//     }
//   },
//   actions: {
//     messageAlert({ commit }, payload: string) {
//       console.log(payload, "messageAlert");
//       commit("messagesPush", payload);
//       setTimeout(() => {
//         commit("messageRemove");
//       }, 1000);
//     }
//   }
// });
