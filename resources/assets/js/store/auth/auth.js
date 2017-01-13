import AuthResource from './../../resources/auth/Auth';
import { REMOVE_TOKEN, SET_TOKEN } from '../actions';

const TOKEN_KEY = 'token';

export default {
  actions: {

    [SET_TOKEN]({ commit }, { email, password }) {
      return AuthResource.login({
        email: email,
        password: password
      })
        .then(({ body: {token} }) => ( commit(SET_TOKEN, token) ))
        .catch(({ body }) => { throw body[0] });
    },

    [REMOVE_TOKEN]({ commit }) {
      return commit(REMOVE_TOKEN);
    }

  },

  state: {
    token: window.localStorage.getItem(TOKEN_KEY)
  },

  mutations: {
    [SET_TOKEN](state, token) {
      window.localStorage.setItem(TOKEN_KEY, token);

      return state.token = token;
    },
    [REMOVE_TOKEN](state) {
      window.localStorage.removeItem(TOKEN_KEY);

      return state.token = null;
    }
  },

  getters: {
    isAuth: state => !!state.token
  }
};