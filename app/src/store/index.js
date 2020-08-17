import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import gui from "./modules/gui";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    gui
  }
});
