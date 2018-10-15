import { browser, by, element, ExpectedConditions } from 'protractor';

export class SignupPage {
  navigateTo() {
    return browser.get('/signup');
  }

  enterValueIntoField(value: string, field: string) {
    return element(by.css('input[type=' + field + ']')).sendKeys(value);
  }

  clickButton(label: string) {
    return element(by.css('form button')).click();
  }

  currentUrl() {
    return browser
      .wait(
        ExpectedConditions.textToBePresentInElement(
          element(by.css('.logo')),
          'DV8'
        ),
        5000
      )
      .then(() => browser.getCurrentUrl())
      .then((url) => url.replace(browser.baseUrl + '/', ''));
  }

  hasSuccessMsg() {
    return element(by.css('.msg-success')).getText();
  }

  hasCheckEmailMsg() {
    return element(by.css('.msg-check-email')).getText();
  }
}
