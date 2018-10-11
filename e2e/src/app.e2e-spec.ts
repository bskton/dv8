import { AppPage } from './app.po';

describe('Home page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display "Click me!" button', () => {
    page.navigateTo();
    expect(page.getHomeButtonText()).toEqual("Click me!");
  });
});
