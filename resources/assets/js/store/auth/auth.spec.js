import auth from './auth';
import { REMOVE_TOKEN, SET_TOKEN } from './../actions';

const TOKEN_KEY = 'token';
const TOKEN = 'some-random-string-for-testing';

describe('auth.mutations', () => {
  it('should set token', () => {
    const state = { token: null };

    auth.mutations[SET_TOKEN](state, TOKEN);

    expect(state.token).toBe(TOKEN);
    expect( window.localStorage.getItem(TOKEN_KEY) ).toBe(TOKEN);
  });

  it('should remove token', () => {
    const state = { token: null };

    auth.mutations[REMOVE_TOKEN](state);

    expect(state.token).toBe(null);
    expect( window.localStorage.getItem(TOKEN_KEY) ).toBe(null);
  });
});

describe('auth.getters', () => {
  it('should return that user is NOT authorized if token is not set', () => {
    const state = { token: null };

    expect( auth.getters.isAuth(state) ).toBe(false);
  });
  it('should return that user is authorized if token is set', () => {
    const state = { token: TOKEN };

    expect( auth.getters.isAuth(state) ).toBe(true);
  });
});