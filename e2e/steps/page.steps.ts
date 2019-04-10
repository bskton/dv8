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

Then('I see {string} link', (label: string, cb) => {
  page.seeLink(label).then(text => {
    expect(text).to.be.eq(label);
    cb();
  });
});

Then('I click {string} link', (label: string, cb) => {
  page.clickLink(label).then(() => cb());
});

Then('I am navigated on page {string}', (expectedUrl: string, cb) => {
  page.navigated(expectedUrl).then((currentUrl) => {
    expect(currentUrl).to.be.eq(expectedUrl);
    cb();
  });
});

Then('I reload the page', (cb) => {
  page.refresh().then(() => {
    cb();
  });
});

Then('I wait until see header {string}', (header: string, cb) => {
  page.waitUntilSeeHeader().then((text: string) => {
    expect(text).to.be.eq(header);
    cb();
  });
});
