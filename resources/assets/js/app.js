import Vue from 'vue';
import VueRes from 'vue-resource';
import router from './router';
import AuthResource from './resources/auth/Auth';

require('./bootstrap');

Vue.use(VueRes);

const App = require('./components/App.vue');

Vue.http.interceptors.push((request, next) => {
  let token = AuthResource.getToken();

  request.headers.map['Authorization'] = [`Bearer ${token}`];
  next();
});

const app = new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
