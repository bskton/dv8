import { Before, Given, When, Then } from 'cucumber';
import { expect } from 'chai';
import { browser } from 'protractor';

import { SignupPage } from '../pages/signup.po';

let page: SignupPage;

Before(() => {
  page = new SignupPage();
});

Given('I am on page {string}', (url: string, cb) => {
  page.navigateTo(url).then(() => {
    cb();
  });
});

When('I enter {string} into the field {string}', (email, field, cb) => {
  page.enterValueIntoField(email, field).then(() => cb());
});

When('enter {string} into the field {string}', (password, field, cb) => {
  page.enterValueIntoField(password, field).then(() => cb());
});

When('click button {string}', (label, cb) => {
  page.clickButton(label).then(() => cb());
});

Then('I redirected on page {string}', (url, cb) => {
  page.currentUrl().then(currentUrl => {
    expect(currentUrl).to.be.eq(browser.baseUrl + '/' + url);
    cb();
  });
});