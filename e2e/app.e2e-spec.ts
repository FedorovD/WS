import { WSPage } from './app.po';

describe('ws App', () => {
  let page: WSPage;

  beforeEach(() => {
    page = new WSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
