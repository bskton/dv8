import { browser } from 'protractor';

export class Browser {
  startNew() {
    return browser.restart();
  }
}
