import { Before, Given, When, Then, After } from 'cucumber';
import { expect } from 'chai';

import { Auth } from '../libs/auth';
import { ProfilePage } from '../pages/profile.po';
import { SignupPage } from '../pages/signup.po';

let profile: ProfilePage;
let page: SignupPage;
let auth: Auth;

Before({ tags: '@signup' }, () => {
  page = new SignupPage();
  profile = new ProfilePage();
  auth = new Auth();
  auth.init();
});

Given('I am on sign up page', cb => {
  page.navigateTo().then(() => {
    cb();
  });
});

Given(
  'a user with email {string} and password {string} does not exist',
  { timeout: 10000 },
  (email: string, password: string, cb) => {
    auth
      .removeUser(email, password)
      .then(() => cb())
      .catch(() => cb());
  }
);

When('I enter {string} into the field {string}', (email, field, cb) => {
  page.enterValueIntoField(email, field).then(() => cb());
});

When('enter {string} into the field {string}', (password, field, cb) => {
  page.enterValueIntoField(password, field).then(() => cb());
});

When(
  'click button {string} and redirected on page {string} with url {string}',
  (label: string, header: string, url: string, cb) => {
    page
      .clickButton(label)
      .then(() => profile.urlAfterLoad(header))
      .then((currentUrl: string) => {
        expect(currentUrl).to.be.eq(url);
        cb();
      });
  }
);

Then('I see success message {string}', (msg, cb) => {
  page.hasSuccessMsg().then(text => {
    expect(msg).to.be.eq(text);
    cb();
  });
});

Then('I see message {string}', (msg, cb) => {
  page.hasCheckEmailMsg().then(text => {
    expect(msg).to.be.eq(text);
    cb();
  });
});

Before({ tags: '@signup-failed' }, () => {
  page = new SignupPage();
  auth = new Auth();
  auth.init();
});

Given(
  'a user with email {string} and password {string} already exists',
  { timeout: 10000 },
  (email: string, password: string, cb) => {
    auth
      .removeUser(email, password)
      .then(() => auth.createUser(email, password))
      .then(() => cb())
      .catch(() => {
        auth.createUser(email, password).then(() => cb());
      });
  }
);

When('I press button {string}', (label: string, cb) => {
  page.clickSignupButton(label).then(() => cb());
});

Then('I am on same page {string}', (url: string, cb) => {
  page.url().then((currentUrl: string) => {
    expect(currentUrl).to.be.eq(url);
    cb();
  });
});

Then('I see error message {string}', (msg: string, cb) => {
  page.hasErrorMsg().then((errorMsg: string) => {
    expect(errorMsg).to.be.eq(msg);
    cb();
  });
});

Given('page {string} is opened', (url: string, cb) => {
  page.openUrl(url).then(() => cb());
});

When('I click input {string}', (label: string, cb) => {
  page.clickInput(label).then(() => cb());
});

Then(
  'I see validation message {string} for {string}',
  (msg: string, label: string, cb) => {
    page.getValidationMsgFor(label).then((actualMsg: string) => {
      expect(actualMsg).to.be.eq(msg);
      cb();
    });
  }
);

Given('I am on page {string}', (url: string, cb) => {
  page.navigateToUrl(url).then(() => {
    cb();
  });
});
