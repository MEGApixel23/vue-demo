import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Login = require('./components/Login.vue');
const List = require('./components/List.vue');

const routes = [
  {
    path: '/',
    component: List,
    name: 'list'
  }
];

const router = new VueRouter({ routes });

export default router;