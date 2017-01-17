import ItemResource from './../../resources/Item';
import { GET_ITEMS, DELETE_ITEM, CREATE_ITEM } from '../actions';
import { SET_ITEMS, REMOVE_ITEM, ADD_ITEM } from '../mutations';

export default {
  actions: {

    [GET_ITEMS]({ commit }) {
      return ItemResource.query()
        .then(({ body: {data} }) => commit(SET_ITEMS, data));
    },
    [DELETE_ITEM]({ commit }, { id }) {
      return ItemResource.delete({ id })
        .then( ({ body: {id} }) => commit(REMOVE_ITEM, id) );
    },
    [CREATE_ITEM]({ commit }, text) {
      return ItemResource.save({ text })
        .then( ({ body: item }) => commit(ADD_ITEM, item) );
    }
  },

  state: {
    items: undefined
  },

  mutations: {
    [SET_ITEMS](state, items) {
      return state.items = items;
    },
    [REMOVE_ITEM](state, id) {
      return state.items = state.items.filter((item) => ( item.id !== id) );
    },
    [ADD_ITEM](state, item) {
      return state.items = [...state.items, item];
    }
  }
};