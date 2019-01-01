import { browser, by, element, ExpectedConditions } from 'protractor';

export class Message {
  isSuccess() {
    return element(by.css('.msg-success')).getText();
  }

  isCheckEmail() {
    return element(by.css('.msg-check-email')).getText();
  }

  isError() {
    return browser
      .wait(
        ExpectedConditions.visibilityOf(element(by.css('simple-snack-bar'))),
        5000
      )
      .then(() => element(by.css('simple-snack-bar')).getText());
  }
}
