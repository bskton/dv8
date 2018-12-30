import { by, element } from 'protractor';

export class Form {
  enterValueIntoField(value: string, field: string) {
    return element(by.css('input[type=' + field + ']')).sendKeys(value);
  }

  pressButton(label: string) {
    return element(by.buttonText(label)).click();
  }
}
