import { CzAdminFrontPage } from './app.po';

describe('cz-admin-front App', () => {
  let page: CzAdminFrontPage;

  beforeEach(() => {
    page = new CzAdminFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
