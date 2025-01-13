import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem("user_name"),
    userName: localStorage.getItem("user_name") || "", // Aggiunto il nome utente nello stato
  },
  mutations: {
    setLoginState(state, { isLoggedIn, userName }) {
      state.isLoggedIn = isLoggedIn;
      state.userName = userName;
    },
  },
  actions: {
    login({ commit }, userName) {
      // Salva il nome utente nel localStorage e aggiorna lo stato
      localStorage.setItem("user_name", userName);
      commit("setLoginState", { isLoggedIn: true, userName });
    },
    logout({ commit }) {
      // Rimuovi il nome utente dal localStorage e aggiorna lo stato
      localStorage.removeItem("user_name");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      commit("setLoginState", { isLoggedIn: false, userName: "" });
    },
  },
});
