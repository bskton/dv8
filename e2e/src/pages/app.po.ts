import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHomeButtonText() {
    return element(by.css('app-home button')).getText();
  }
}
