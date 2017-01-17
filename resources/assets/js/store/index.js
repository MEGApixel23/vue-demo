import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth/auth';
import item from './item/item';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: { ...auth.actions, ...item.actions },
  getters: { ...auth.getters, ...item.getters },
  mutations: { ...auth.mutations, ...item.mutations },
  state: { ...auth.state, ...item.state },
});