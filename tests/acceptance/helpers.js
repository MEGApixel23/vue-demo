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