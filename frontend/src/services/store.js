import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem("user_name"),
    userName: localStorage.getItem("user_name") || "",
    role: localStorage.getItem("user_role") || "user",
  },
  mutations: {
    setLoginState(state, { isLoggedIn, userName, role }) {
      state.isLoggedIn = isLoggedIn;
      state.userName = userName;
      state.role = role;
    },
  },
  actions: {
    login({ commit }, user) {
      localStorage.setItem("user_name", user.name);
      localStorage.setItem("user_role", user.role);
      commit("setLoginState", { isLoggedIn: true, userName: user.name, role: user.role });
    },
    logout({ commit }) {
      // Rimuovi il nome utente dal localStorage e aggiorna lo stato
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_role");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      commit("setLoginState", { isLoggedIn: false, userName: "", role: "user" });
    },
  },
});
