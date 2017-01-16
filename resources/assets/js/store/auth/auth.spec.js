import auth from './auth';
import { testAction } from './../../utils';
import actionsInjector from 'inject!./auth';
import { REMOVE_TOKEN, SET_TOKEN, CHECK_TOKEN } from './../actions';

const tokenKey = 'token';
const email = 'some_email@mail.com';
const password = 'someRandomPassword';
const wrongPassword = 'wrongPassword';
const token = 'some-random-string-for-testing';

describe('auth.mutations', () => {
  it('should set token', () => {
    const state = { token: null };

    auth.mutations[SET_TOKEN](state, token);

    expect(state.token).toBe(token);
    expect( window.localStorage.getItem(tokenKey) ).toBe(token);
  });

  it('should remove token', () => {
    const state = { token: null };

    auth.mutations[REMOVE_TOKEN](state);

    expect(state.token).toBe(null);
    expect( window.localStorage.getItem(tokenKey) ).toBe(null);
  });
});

describe('auth.getters', () => {
  it('should return that user is NOT authorized if token is not set', () => {
    const state = { token: null };

    expect( auth.getters.isAuth(state) ).toBe(false);
  });

  it('should return that user is authorized if token is set', () => {
    const state = { token: token };

    expect( auth.getters.isAuth(state) ).toBe(true);
  });
});

describe('auth.actions', () => {
  const actions = actionsInjector({
    './../../resources/auth/Auth': {
      login(payload) {
        return new Promise((resolve, reject) => {
          if (payload.email === email && payload.password === password) {
            return resolve({
              body: { token }
            });
          }

          return reject();
        });
      },

      verify() {
        return new Promise((resolve, reject) => {
          return reject();
        });
      }
    }
  });
  const actionSetToken = actions.default.actions[SET_TOKEN];
  const actionRemoveToken = actions.default.actions[REMOVE_TOKEN];
  const actionCheckAuth = actions.default.actions[CHECK_TOKEN];

  it('should set token', done => {
    testAction({
      done,
      action: actionSetToken,
      payload: { email, password },
      expectedMutations: {
        type: SET_TOKEN,
        payload: token
      }
    });
  });

  it('should not set token if email or password are invalid', done => {
    testAction({
      done,
      action: actionSetToken,
      payload: { email, password: wrongPassword }
    });
  });

  it('should remove token', done => {
    testAction({
      done,
      action: actionRemoveToken,
      expectedMutations: {type: REMOVE_TOKEN}
    });
  });

  it('should remove token if token check is failed', done => {
    testAction({
      done,
      action: actionCheckAuth,
      expectedMutations: {type: REMOVE_TOKEN}
    });
  });
});