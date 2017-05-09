import { HelloFirebaseDeployPage } from './app.po';

describe('hello-firebase-deploy App', () => {
  let page: HelloFirebaseDeployPage;

  beforeEach(() => {
    page = new HelloFirebaseDeployPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
