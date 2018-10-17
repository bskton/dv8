import { browser, by, element, ExpectedConditions } from 'protractor';

export abstract class Page {
  url() {
    return browser.getCurrentUrl().then(url => this.pathFrom(url));
  }

  urlAfterLoad(header: string) {
    return browser
      .wait(
        ExpectedConditions.textToBePresentInElement(
          element(by.css('h1')),
          header
        ),
        5000
      )
      .then(() => browser.getCurrentUrl())
      .then(url => this.pathFrom(url));
  }

  navigateToUrl(url: string) {
    return browser.get('/' + url);
  }

  private pathFrom(url: string) {
    return url.replace(browser.baseUrl + '/', '');
  }
}
