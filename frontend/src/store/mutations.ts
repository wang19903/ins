import { MutationTree } from "vuex";
import { State } from "./state";

export enum MutationType {
  changeShowPostUpload = "CHANGESHOWPOSTUPLOAD",
  changeShowPostDetails = "CHANGESHOWPOSTDETAILS",
  messagesPush = "MESSAGESPUSH",
  messageRemove = "MESSAGEREMOVE"
}

export type Mutations<S = State> = {
  [MutationType.changeShowPostDetails](state: S, show: boolean): void;
  [MutationType.changeShowPostUpload](state: S, show: boolean): void;
  [MutationType.messageRemove](state: S): void;
  [MutationType.messagesPush](state: S, message: string): void;
};
//MutationTree<State> & Mutations=>TS確保型別正確才執行
export const mutations: MutationTree<State> & Mutations = {
  [MutationType.changeShowPostDetails](state: State, show: boolean) {
    state.showPostUpload = show;
  },
  [MutationType.changeShowPostUpload](state: State, show: boolean) {
    state.showPostUpload = show;
  },
  [MutationType.messageRemove](state: State) {
    state.messages = "";
  },
  [MutationType.messagesPush](state: State, messages: string) {
    console.log(messages, "messagesPush");
    state.messages = messages;
  }
};
