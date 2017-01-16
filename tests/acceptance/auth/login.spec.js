import { login } from './../locators';
import { waitFor } from './../helpers';
import { BASE_URL, credentials } from './../constants';

browser.ignoreSynchronization = true;

describe('Authorization flow', () => {
  browser.get(BASE_URL);

  let email = element(login.email);
  let password = element(login.password);
  let submit = element(login.login);
  let logout = element(login.logout);

  it('should authorize', () => {
    expect(email.isPresent()).toBe(true);
    expect(password.isPresent()).toBe(true);
    expect(submit.isPresent()).toBe(true);

    email.sendKeys(credentials.valid.email);
    password.sendKeys(credentials.valid.password);
    submit.click();

    waitFor({locator: login.logout})
      .then(() => logout.click());
  });

  it('should show error on wrong login credentials', () => {
    email.sendKeys('atatata');
    password.sendKeys('atatata');
    submit.click();

    waitFor({locator: login.errors});
  });
});