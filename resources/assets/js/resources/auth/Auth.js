import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const TOKEN_KEY = 'token';
const resource = Vue.resource('/api/login', {}, {
  login: {
    method: 'POST'
  }
});

const getToken = () => ( window.localStorage.getItem(TOKEN_KEY) );

export default {
  ...resource,
  getToken,
  setToken(token) {
    window.localStorage.setItem(TOKEN_KEY, token);
    return token;
  },
  isAuth() {
    return !!getToken();
  },
  destroyToken() {
    window.localStorage.removeItem(TOKEN_KEY);
    return true;
  }
};