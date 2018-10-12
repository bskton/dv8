import { Before, Given, Then } from 'cucumber';
import { expect } from 'chai';

import { HomePage } from '../pages/home.po';

let page: HomePage;

Before(() => {
  page = new HomePage();
})

Given('I am on home page', (cb) => {
  page.navigateTo().then(() => {
    cb();
  });
})

Then('I should see {string} button', (label: string, cb) => {
  page.getHomeButtonText().then(text => {
    expect(text).to.be.eql(label);
    cb();
  })
})