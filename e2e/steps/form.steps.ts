import { Before, When } from 'cucumber';

import { Form } from '../libs/form';

let form: Form;

Before(() => {
  form = new Form();
});

When('I enter {string} into the field {string}', (value, field, cb) => {
  form.enterValueIntoField(value, field).then(() => cb());
});

When('I press button {string}', (label: string, cb) => {
  form.pressButton(label).then(() => cb());
});
