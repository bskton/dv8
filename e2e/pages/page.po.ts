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

  seeLink(label: string) {
    return element(by.linkText(label)).getText();
  }

  private pathFrom(url: string) {
    return url.replace(browser.baseUrl + '/', '');
  }
}
