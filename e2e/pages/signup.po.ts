import { browser, by, element, ExpectedConditions } from 'protractor';
import { Page } from './page.po';

export class SignupPage extends Page {
  navigateTo() {
    return browser.get('/signup');
  }

  enterValueIntoField(value: string, field: string) {
    return element(by.css('input[type=' + field + ']')).sendKeys(value);
  }

  clickButton(label: string) {
    return element(by.css('form button')).click();
  }

  hasSuccessMsg() {
    return element(by.css('.msg-success')).getText();
  }

  hasCheckEmailMsg() {
    return element(by.css('.msg-check-email')).getText();
  }

  clickSignupButton(label: string) {
    return element(by.buttonText(label)).click();
  }

  hasErrorMsg() {
    return browser
      .wait(
        ExpectedConditions.visibilityOf(element(by.css('simple-snack-bar'))),
        5000
      )
      .then(() => element(by.css('simple-snack-bar')).getText());
  }

  openUrl(url: string) {
    return browser.get('/' + url);
  }

  clickInput(label: string) {
    return element(by.css('input[placeholder="' + label + '"]')).click();
  }

  getValidationMsgFor(label: string) {
    return element(
      by.css('.signup-form__input-' + label.toLowerCase() + ' mat-error')
    ).getText();
  }
}
