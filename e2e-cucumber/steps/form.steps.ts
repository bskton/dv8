import { Before, Then, When } from 'cucumber';
import { expect } from 'chai';

import { Form } from '../libs/form';

let form: Form;

Before('@form', () => {
  form = new Form();
});

When('I enter {string} into the field {string}', (value, field, cb) => {
  form.enterValueIntoField(value, field).then(() => cb());
});

When('I press button {string}', (label: string, cb) => {
  form.pressButton(label).then(() => cb());
});

When('I click input {string}', (label: string, cb) => {
  form.clickInput(label).then(() => cb());
});

Then('I see {string} button', (label: string, cb) => {
  form.seeButton(label).then(text => {
    expect(text).to.be.eq(label);
    cb();
  });
});

Then('I see validation message {string} for {string}', (msg: string, label: string, cb) => {
  form.getValidationMsgFor(label).then((actualMsg: string) => {
    expect(actualMsg).to.be.eq(msg);
    cb();
  });
});

Then('I wait until see {string} button', (label: string, cb) => {
  form.waitUntilSeeButton(label).then((present: boolean) => {
    expect(present).to.be.eq(true);
    cb();
  });
});
