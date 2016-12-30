import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const IssuesList = require('./components/IssuesList.vue');
const IssueView = require('./components/IssueView.vue');

const routes = [
  {
    path: '/',
    component: IssuesList,
    name: 'home'
  }, {
    path: '/:id',
    component: IssueView,
    name: 'issue'
  }
];
const router = new VueRouter({ routes });

export default router;