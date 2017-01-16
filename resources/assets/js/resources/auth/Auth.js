import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const resource = Vue.resource('/api/login', {}, {
  login: {
    method: 'POST'
  },
  verify: {
    method: 'GET',
    url: '/api/auth/verify'
  }
});

export default resource;