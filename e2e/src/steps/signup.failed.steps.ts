import { Before, Given, When, Then, After } from 'cucumber';
import { expect } from 'chai';
import { browser } from 'protractor';
import * as firebase from 'firebase';
import { environment } from '../../../src/environments/environment';

import { SignupPage } from '../pages/signup.po';

let page: SignupPage;

function createUser(
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function removeUser(email: string, password: string): Promise<void> {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential: firebase.auth.UserCredential) =>
      userCredential.user.delete()
    );
}

Before(() => {
  page = new SignupPage();
  firebase.initializeApp(environment.firebase);
});

Given('a user with email {string} already exists', (email: string, cb) => {
  removeUser(email, '123123')
    .then(() => createUser(email, '123123'))
    .then(() => cb())
    .catch(() => {
      createUser(email, '123123').then(() => cb());
    });
});