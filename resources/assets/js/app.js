import Vue from 'vue';
import Vuex from 'vuex';
import VueRes from 'vue-resource';
import router from './router';
import AuthResource from './resources/auth/Auth';

require('./bootstrap');

Vue.use(VueRes);
Vue.use(Vuex);

const TOKEN_KEY = 'token';
const App = require('./components/App.vue');
const store = new Vuex.Store({
  state: {
    token: window.localStorage.getItem(TOKEN_KEY)
  },
  mutations: {
    setToken(state, token) {
      window.localStorage.setItem(TOKEN_KEY, token);

      return state.token = token;
    },
    removeToken(state) {
      window.localStorage.removeItem(TOKEN_KEY);

      return state.token = null;
    }
  }
});

Vue.http.interceptors.push((request, next) => {
  if (store.state.token) {
    request.headers.map['Authorization'] = [`Bearer ${store.state.token}`];
  }

  next();
});

const app = new Vue({
  store,
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
