import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {...auth.actions},
  getters: {...auth.getters},
  mutations: {...auth.mutations},
  state: {...auth.state},
});