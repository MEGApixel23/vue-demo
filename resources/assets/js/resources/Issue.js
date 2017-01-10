import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const baseUrl = 'https://api.github.com/repos{/ownerLogin}{/name}issues{/id}';
const resource = {
  ...Vue.resource(baseUrl),
  parseLastPage(response) {
    let links = response.headers.map.Link[0];
    let res = links.match(/", <https:\/\/.+page=(\d+)>; rel="last"/);

    return res && Object.prototype.hasOwnProperty.call(res, 1) ?
      parseInt(res[1]) : undefined;
  }
};

export default resource;