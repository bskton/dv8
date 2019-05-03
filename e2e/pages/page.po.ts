import { browser, by, element, ExpectedConditions } from 'protractor';

export class Page {
  clickLink(label: string) {
    return element(by.linkText(label)).click();
  }

  navigateToUrl(url: string) {
    return browser.get('/' + url);
  }

  navigated(expectedUrl: string) {
    let currentUrl = null;
    return browser.wait(ExpectedConditions.and(() => {
      return browser.getCurrentUrl().then(url => {
        currentUrl = this.pathFrom(url);
        return expectedUrl === currentUrl;
      });
    }), 5000).then(() => currentUrl);
  }

  refresh() {
    return browser.refresh();
  }

  seeHeader() {
    return element(by.tagName('h1')).getText();
  }

  seeLink(label: string) {
    return element(by.linkText(label)).getText();
  }

  seeSpinner() {
    return element(by.tagName('mat-spinner')).isPresent();
  }

  waitUntilSeeHeader() {
    return browser.wait(ExpectedConditions.presenceOf(element(by.tagName('h1'))), 5000)
      .then(() => element(by.tagName('h1')).getText());
  }

  private pathFrom(url: string) {
    return url.replace(browser.baseUrl + '/', '');
  }
}
