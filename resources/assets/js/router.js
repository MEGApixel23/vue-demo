import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Example = require('./components/Example.vue');

const routes = [
  {
    path: '/',
    component: Example
  }
];
const router = new VueRouter({ routes });

export default router;