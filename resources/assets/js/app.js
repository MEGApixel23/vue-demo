import Vue from 'vue';
import VueRes from 'vue-resource';
import router from './router';

require('./bootstrap');

Vue.use(VueRes);

const App = require('./components/App.vue');

const app = new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
