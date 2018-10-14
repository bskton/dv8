import { Before, Given, When, Then, After } from 'cucumber';
import { expect } from 'chai';
import { browser } from 'protractor';

import { Auth } from '../libs/auth';
import { SignupPage } from '../pages/signup.po';

let page: SignupPage;
let auth: Auth;

Before(() => {
  page = new SignupPage();
  auth = new Auth();
  auth.init();
});

Given('a user with email {string} already exists', (email: string, cb) => {
  auth.removeUser(email, '123123')
    .then(() => auth.createUser(email, '123123'))
    .then(() => cb())
    .catch(() => {
      auth.createUser(email, '123123').then(() => cb());
    });
});