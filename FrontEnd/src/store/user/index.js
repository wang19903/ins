import { changeUser } from "../../apis/user";
import { getUser, login, logout, register } from "../../apis/auth";

export const user = {
  state() {
    return {
      user: getUser() || {},
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async registerUser({ commit }, { email, username, password }) {
      const user = await register(email, username, password);
      commit("setUser", user);
    },
    async loginUser({ commit }, { email, password }) {
      // try {
      const user = await login(email, password);
      commit("setUser", user);
      // } catch (error) {
      //   console.log(error);
      // }
    },
    async updateUser({ commit }, user) {
      const updatedUser = await changeUser(user);
      commit("setUser", updatedUser);
    },
    async logoutUser({ commit }) {
      logout();
      commit("setUser", {});
    },
  },
};
