import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const resource = Vue.resource('/api/items{/id}');

export default resource;