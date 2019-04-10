import { Before, When } from 'cucumber';
import { Navigation } from '../libs/navigation';
import { expect } from 'chai';

let navigation: Navigation;

Before('@navigation', () => {
  navigation = new Navigation();
});

When('I click menu button', (cb) => {
  navigation.pressMenu().then(() => {
    cb();
  });
});

When('I see main menu with item {string}', (label: string, cb) => {
  navigation.seeMainMenuWithItem(label).then((expectedLabel: string) => {
    expect(label).to.be.eq(expectedLabel);
    cb();
  });
});

When('I click main menu item {string}', (label: string, cb) => {
  navigation.clickMainMenuItem(label).then(() => {
    cb();
  });
});
