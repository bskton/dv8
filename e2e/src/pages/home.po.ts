import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getHomeButtonText() {
    return element(by.css('app-home button')).getText();
  }
}
