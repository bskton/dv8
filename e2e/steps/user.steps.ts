import { Before, Given } from 'cucumber';

import { Auth } from '../libs/auth';

let auth: Auth;

Before('@user',() => {
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
