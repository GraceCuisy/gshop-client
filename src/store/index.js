/**
 * vuex最核心的管理对象
 */
import Vue from 'vue';
import Vuex from 'vuex';
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import modules from "./modules";
// 声明使用Vuex
Vue.use(Vuex);

//默认向外暴露一个store对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
})