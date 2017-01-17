import { login } from './locators';
import { credentials } from './constants';

export const waitFor = ({locator, timeout = 2000, callback}) => {
  return browser.wait(
    () => browser.isElementPresent(locator),
    timeout
  ).then(() => {
    if (callback instanceof Function) {
      callback();
    }
  });
};

/**
 * @return Promise
 */
export const auth = () => {
  let email = element(login.email);
  let submit = element(login.login);
  let password = element(login.password);

  email.sendKeys(credentials.valid.email);
  password.sendKeys(credentials.valid.password);
  submit.click();

  return waitFor({locator: login.logout});
};