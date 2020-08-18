import Vue from "vue";
import Vuex from "vuex";
// import users from "./modules/users";
import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // users
    auth
  }
});
