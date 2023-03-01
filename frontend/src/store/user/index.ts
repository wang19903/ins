import { changeUser } from "../../apis/user";
import { getUser, login, logout, register } from "../../apis/auth";

export interface userState {
  user: any;
}

export const user = {
  state(): userState {
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
    async registerUser({ commit }, { email, username, password }) {
      const user = await register(email, username, password);
      commit("setUser", user);
    },
    async loginUser({ commit }, { email, password }) {
      const user = await login(email, password);
      if (user.confirmed) {
        commit("setUser", user);
        return "success";
      } else {
        console.log(user);
        return user;
      }
    },
    async updateUser({ commit }, user) {
      const updatedUser = await changeUser(user);
      commit("setUser", updatedUser);
    },
    async logoutUser({ commit }) {
      logout();
      commit("setUser", {});
    }
  }
};
