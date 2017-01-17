import item from './item';
import { GET_ITEMS, DELETE_ITEM, CREATE_ITEM } from './../actions';
import { testAction } from './../../utils';
import actionsInjector from 'inject!./item';
import { SET_ITEMS, REMOVE_ITEM, ADD_ITEM } from './../mutations';

const getTestItems = () => [
  {id: 1, text: 'test 1'},
  {id: 2, text: 'test 2'},
  {id: 3, text: 'test 3'},
];
const getNewItem = () => ( {id: 4, text: 'test 4'} );
const deleteItem = (items, itemToDelete) => items.filter((item) => item.id !== itemToDelete.id);

describe('auth.mutations', () => {
  it('should set items', () => {
    let state = { items: undefined };
    let testItems = getTestItems();

    item.mutations[SET_ITEMS](state, testItems);
    expect(state.items).toEqual(testItems);
  });

  it('should remove given item', () => {
    let state = { items: getTestItems() };
    let itemToRemove = state.items[1];
    let resultItems = deleteItem( state.items, itemToRemove );

    item.mutations[REMOVE_ITEM](state, itemToRemove.id);
    expect(state.items).toEqual(resultItems);
  });

  it('should add given item', () => {
    let state = { items: getTestItems() };
    let itemToAdd = getNewItem();
    let resultItems = [ ...state.items, itemToAdd ];

    item.mutations[ADD_ITEM](state, itemToAdd);
    expect(state.items).toEqual(resultItems);
  });
});

describe('auth.actions', () => {
  const actions = actionsInjector({
    './../../resources/Item': {
      query() {
        return new Promise(resolve => resolve({
          body: {
            data: getTestItems()
          }
        }));
      },
      delete({ id }) {
        return new Promise(resolve => resolve({
          body: {
            data: { id }
          }
        }));
      },
      save({ text }) {
        return new Promise(resolve => resolve({
          body: Object.assign({}, getNewItem(), { text })
        }));
      }
    }
  });

  it('should get items list', done => {
    testAction({
      done,
      action: actions.default.actions[GET_ITEMS],
      expectedMutations: {
        type: SET_ITEMS,
        payload: getTestItems()
      }
    });
  });

  it('should get delete item from the list', done => {
    testAction({
      done,
      action: actions.default.actions[DELETE_ITEM],
      payload: getTestItems()[1],
      state: getTestItems(),
      expectedMutations: {
        type: REMOVE_ITEM,
        payload: deleteItem( getTestItems(), getTestItems()[1] )
      }
    });
  });

  it('should get create item', done => {
    testAction({
      done,
      action: actions.default.actions[CREATE_ITEM],
      payload: getNewItem().text,
      state: getTestItems(),
      expectedMutations: {
        type: ADD_ITEM,
        payload: getNewItem()
      }
    });
  });
});