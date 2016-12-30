import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const baseUrl = 'https://api.github.com/repos/octocat/Hello-World/issues{/id}';
const resource = Vue.resource(baseUrl);

export default resource;