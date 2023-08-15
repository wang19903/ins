import { ActionContext, Module } from "vuex";
import { RootState } from "../index";
import { changeUser } from "../../apis/user";
import { getUser, login, logout, register } from "../../apis/auth";

export interface UserState {
  user: any;
}

export const user: Module<UserState, RootState> = {
  state() {
    return {
      user: getUser() || {}
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async registerUser(context: ActionContext<UserState, RootState>, { email, username, password }:{ email:string, username:string, password:string }) {
      const user = await register(email, username, password);
      context.commit("setUser", user);
    },
    async loginUser(context: ActionContext<UserState, RootState>, { email, password }: { email: string, password: string }) {
      const user = await login(email, password);
      if (user.confirmed) {
        context.commit("setUser", user);
        return "success";
      } else {
        console.log(user);
        return user;
      }
    },
    async updateUser(context: ActionContext<UserState, RootState>, user: any) {
      const updatedUser = await changeUser(user);
      context.commit("setUser", updatedUser);
    },
    async logoutUser(context: ActionContext<UserState, RootState>) {
      logout();
      context.commit("setUser", {});
    }
  }
};
