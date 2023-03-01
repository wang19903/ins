import type { RootState, AugmentedActionContext } from "../index";
import type { Commit, MutationTree, ActionTree } from "vuex";

export interface IgeneralState {
  showPostUpload: boolean;
  showPostDetails: boolean;
  messages: string;
}
export const state: IgeneralState = {
  showPostUpload: false,
  showPostDetails: false,
  messages: ""
};

export enum generalMutationTypes {
  CHANGE_SHOW_POST_UPLOAD = "CHANGE_SHOW_POST_UPLOAD",
  CHANGE_SHOW_POST_DETAILS = "CHANGE_SHOW_POST_DETAILS",
  MESSAGE_PUSH = "MESSAGE_PUSH",
  MESSAGE_REMOVE = "MESSAGE_REMOVE"
}

export type Mutations<S = IgeneralState> = {
  [generalMutationTypes.CHANGE_SHOW_POST_UPLOAD](state: S, show: boolean): void;
  [generalMutationTypes.CHANGE_SHOW_POST_DETAILS](
    state: S,
    show: boolean
  ): void;
  [generalMutationTypes.MESSAGE_PUSH](state: S, message: string): void;
  [generalMutationTypes.MESSAGE_REMOVE](state: S): void;
};

export const mutations: MutationTree<IgeneralState> = {
  [generalMutationTypes.CHANGE_SHOW_POST_UPLOAD](
    state: IgeneralState,
    show: boolean
  ) {
    state.showPostUpload = show;
  },
  [generalMutationTypes.CHANGE_SHOW_POST_DETAILS](
    state: IgeneralState,
    show: boolean
  ) {
    state.showPostDetails = show;
  },
  [generalMutationTypes.MESSAGE_PUSH](state: IgeneralState, message: string) {
    console.log(message, 11);
    state.messages = message;
  },
  [generalMutationTypes.MESSAGE_REMOVE](state: IgeneralState) {
    state.messages = "";
  }
};

export enum generalActionTypes {
  MESSAGE_ALERT = "MESSAGE_ALERT"
}

export type Actions = {
  [generalActionTypes.MESSAGE_ALERT](
    { commit }: AugmentedActionContext,
    payload: string
  ): void;
};

export const generalActions: ActionTree<IgeneralState, RootState> & Actions = {
  [generalActionTypes.MESSAGE_ALERT](
    { commit }: { commit: Commit },
    payload: string
  ) {
    console.log(payload, "MESSAGE_ALERT");
    commit(generalMutationTypes.MESSAGE_PUSH, payload);
    setTimeout(() => {
      commit(generalMutationTypes.MESSAGE_REMOVE);
    }, 1000);
  }
};

//////////////////////////////
// export const general = {
//   state(): IgeneralState {
//     return {
//       showPostUpload: false,
//       showPostDetails: false,
//       messages: ""
//     };
//   },
//   mutations: {
//     changeShowPostUpload(state: IgeneralState, show: boolean) {
//       state.showPostUpload = show;
//     },
//     changeShowPostDetails(state: IgeneralState, show: boolean) {
//       state.showPostDetails = show;
//     },
//     messagesPush(state: IgeneralState, message: string) {
//       console.log(message, 11);
//       state.messages = message;
//     },
//     messageRemove(state: IgeneralState) {
//       state.messages = "";
//     }
//   },
//   actions: {
//     messageAlert({ commit }: { commit: Commit }, payload: string) {
//       console.log(payload, "messageAlert");
//       commit("messagesPush", payload);
//       setTimeout(() => {
//         commit("messageRemove");
//       }, 1000);
//     }
//   }
// };
