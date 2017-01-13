import Vue from 'vue';
import VueRes from 'vue-resource';
import router from './router';
import store from './store';

require('./bootstrap');
const App = require('./components/App.vue');

Vue.use(VueRes);

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
