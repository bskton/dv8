import { Given, When, Then, Before } from 'cucumber';
import { expect } from 'chai';

import { Message } from '../libs/message';

let message: Message;

Before('@message', () => {
  message = new Message();
});

Then('I see success message {string}', (msg, cb) => {
  message.isSuccess().then(text => {
    expect(msg).to.be.eq(text);
    cb();
  });
});

Then('I see message {string}', (msg, cb) => {
  message.isCheckEmail().then(text => {
    expect(msg).to.be.eq(text);
    cb();
  });
});

Then('I see error message {string}', (msg: string, cb) => {
  message.isError().then((errorMsg: string) => {
    expect(errorMsg).to.be.eq(msg);
    cb();
  });
});
