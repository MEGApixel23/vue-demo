import { auth } from './../helpers';
import { BASE_URL } from './../constants';

browser.ignoreSynchronization = true;

describe('Items list functionality', () => {
  it('123', () => {
    browser.get(BASE_URL);

    auth()
      .then(() => {
        expect(element(by.css('ul')).isPresent()).toBe(true);
      })
  });
});