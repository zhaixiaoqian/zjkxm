var user = {
  state: {
    token: window.sessionStorage.getItem("token") || "",
    userInfo: JSON.parse(window.localStorage.getItem("userInfo")) || {},
    userName: JSON.parse(window.localStorage.getItem("userName")) || {},
  },
  mutations: {
    login(state, payload) {
      state.token = payload.token;
      window.sessionStorage.setItem("token", payload.token);
    },
    setUser(state, payload) {
      state.userInfo = payload.userInfo;
      window.localStorage.setItem("userInfo", JSON.stringify(payload.userInfo));
    },
    setUseName(state, payload) {
      state.userName = payload.userName;
      window.localStorage.setItem("userName", JSON.stringify(payload.userName));
    },
    logout(state) {
      window.sessionStorage.clear();
      window.localStorage.clear();
      state.token = "";
    }
  },
  getters: {
    getUserName(state) {
      return state.userName;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
  }
};
export default user;