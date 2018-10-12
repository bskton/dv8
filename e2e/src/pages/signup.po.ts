import { browser, by, element } from 'protractor';

export class SignupPage {
  navigateTo(url: string) {
    return browser.get(url);
  }

  enterValueIntoField(value: string, field: string) {
    return element(by.css('input[type='+field+']')).sendKeys(value);
  }

  clickButton(label: string) {
    return element(by.css('form button')).click();
  }

  currentUrl() {
    return browser.getCurrentUrl();
  }
}
