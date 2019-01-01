import { Before, Given, Then } from 'cucumber';
import { expect } from 'chai';

import { Page } from '../pages/page.po';

let page: Page;

Before('@page', () => {
  page = new Page();
});

Given('I am on page {string}', (url: string, cb) => {
  page.navigateToUrl(url).then(() => {
    cb();
  });
});

Then('I am navigated on page {string}', (expectedUrl: string, cb) => {
  page.navigated(expectedUrl).then((currentUrl) => {
    expect(currentUrl).to.be.eq(expectedUrl);
    cb();
  });
});
