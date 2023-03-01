import type { InjectionKey } from "vue";
import { createStore, Store as VuexStore } from "vuex";
import type {
  MutationTree,
  ActionTree,
  ActionContext,
  CommitOptions,
  DispatchOptions
} from "vuex";
import {
  mutations as generalMutationTree,
  state as generalState,
  generalActions as generalActionsTree
} from "./general";
import type {
  IgeneralState,
  Actions,
  Mutations as generalMutation
} from "./general";
import { user } from "./user";

export interface RootState {
  general: IgeneralState;
}

const state: RootState = {
  general: generalState
};

// type ModuleTypes<T> = T extends { [key: string]: infer U } ? U : never;
export const key: InjectionKey<VuexStore<RootState>> = Symbol();

export const store = createStore<RootState>({
  modules: {
    general: {
      state: generalState,
      mutations: generalMutationTree,
      actions: generalActionsTree
    },
    user
  }
});

// export type Mutations = MutationTree<RootState & IgeneralState>;
// export const mutations: Mutations = {
//   ...generalMutations
// };

// export type Getters = {};

// export type Actions = ActionTree<RootState, RootState>;
// export const actions: Actions = {
//   ...generalActions
// };

export type Mutations = generalMutation;
// export type Actions = Actions;
const Getters = "";

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1]
  ): ReturnType<Actions[K]>;
} & Omit<ActionContext<RootState, RootState>, "commit" | "dispatch">;

export type ModuleTypes<S = RootState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?:
      | P
      | {
          image: string;
          description: string;
        },
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: Actions
  ): ReturnType<Actions[K]>;
};
// & {
//   getters: {
//     [K in keyof Getters]: ReturnType<Getters[K]>
//   }
// }
