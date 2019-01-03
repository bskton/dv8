import { $, browser, by, element, ExpectedConditions } from 'protractor';

export class Navigation {
  pressMenu() {
    return element(by.css('.hamburger')).click();
  }

  seeMainMenuWithItem(label: string) {
    return browser.wait(
      ExpectedConditions.visibilityOf(
        element(by.cssContainingText('.mat-list-item-content', label))
      ), 5000)
      .then(() => element(by.cssContainingText('.mat-list-item-content', label)).getText());
  }

  clickMainMenuItem(label: string) {
    return element(by.cssContainingText('.mat-list-item-content', label)).click();
  }
}
