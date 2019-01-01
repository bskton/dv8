import { by, element } from 'protractor';

export class Form {
  enterValueIntoField(value: string, field: string) {
    return element(by.css('input[type=' + field + ']')).sendKeys(value);
  }

  pressButton(label: string) {
    return element(by.buttonText(label)).click();
  }

  seeButton(label: string) {
    return element(by.buttonText(label)).getText();
  }

  clickInput(label: string) {
    return element(by.css('input[placeholder="' + label + '"]')).click();
  }

  getValidationMsgFor(label: string) {
    return element(
      by.css('.form-input-' + label.toLowerCase() + ' mat-error')
    ).getText();
  }
}
