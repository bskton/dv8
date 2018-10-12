import { Before, Given, Then } from 'cucumber';
import { expect } from 'chai';
import { browser, by, element } from "protractor";

import { AppPage } from '../pages/app.po';

let page: AppPage;

Before(() => {
  page = new AppPage();
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