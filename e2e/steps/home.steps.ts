import { Before, Given, When, Then } from 'cucumber';
import { browser } from 'protractor';
import { expect } from 'chai';

import { HomePage } from '../pages/home.po';

let page: HomePage;

Before({tags: '@home'}, () => {
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