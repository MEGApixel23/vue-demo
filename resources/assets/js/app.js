import Vue from 'vue';
import router from './router';

require('./bootstrap');

const App = require('./components/App.vue');

const app = new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
