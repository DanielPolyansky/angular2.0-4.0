import { TheprojectPage } from './app.po';

describe('theproject App', () => {
  let page: TheprojectPage;

  beforeEach(() => {
    page = new TheprojectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
