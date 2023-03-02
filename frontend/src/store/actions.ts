import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";

export enum ActionType {
  messageAlert = "MESSAGEALERT"
}

//K extends keyof Mutations=>泛型K可以是Mutations裡的任何一個
//Parameters<Mutations[K]>[1]=>Mutations裡的其中一個，[1]=>裡面的第2個參數
//ReturnType<Mutations[K]>=>Mutations裡的其中一個的回傳
//& Omit<ActionContext<State, State>, "commit">=>固定寫法，確認沒有錯誤
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [ActionType.messageAlert](
    { commit }: AugmentedActionContext,
    payload: string
  ): void;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionType.messageAlert]({ commit }, payload) {
    console.log(payload, "messageAlert");
    commit(MutationType.messagesPush, payload);
    setTimeout(() => {
      commit(MutationType.messageRemove, undefined);
    }, 1000);
  }
};
