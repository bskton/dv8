import { Before, Given } from 'cucumber';
import { Browser } from '../libs/browser';

let browser: Browser;

Before('@browser', () => {
  browser = new Browser();
});

Given('I start new browser', cb => {
  browser.startNew().then(() => {
    cb();
  });
});
