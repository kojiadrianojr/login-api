import API from "./api";

const state = {
  credentials: {
    authenticated: false,
    token: "",
    userInfo: ""
  }
};
const getters = {
  isAuth: state => state.credentials
};
const actions = {
  async register({ commit }, payload) {
    let response = await API.post("/auth/register", {
      name: payload.name,
      email: payload.email,
      username: payload.username,
      password: payload.password,
      confirm_password: payload.confirm_password
    });
    return response;
  },
  async login({ commit }, payload) {
    let response = await API.post("/auth/login", {
      username: payload.username,
      password: payload.password
    });
    commit("setCredential", response.data);
    return response;
  }
};
const mutations = {
  setCredential: (state, payload) => {
    state.credentials.token = payload.token;
    state.credentials.userInfo = payload.userInfo;
    state.credentials.authenticated = true;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
