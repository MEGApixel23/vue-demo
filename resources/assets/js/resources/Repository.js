import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const baseUrl = 'https://api.github.com/search/repositories?q={?search}&sort=stars&order=desc';
const resource = Vue.resource(baseUrl);

export default resource;