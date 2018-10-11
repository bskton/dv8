import { Before, Given, Then } from 'cucumber';
import { expect } from 'chai';

import { AppPage } from '../pages/app.po';

let page: AppPage;

Before(() => {
  page = new AppPage();
})

Given('I am on home page', () => {
  page.navigateTo();
})

Then('I should see {string} button', (label: string) => {
  page.getHomeButtonText().then(text => {
    expect(text).to.be.eql(label);
  });
})