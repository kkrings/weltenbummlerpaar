/**
 * Full integration tests
 * @packageDocumentation
 */

import { browser, logging } from 'protractor';

import { AppPage } from './app.po';
import { AuthModal } from './auth-modal.po';


describe('weltenbummlerpaar', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  beforeEach(() => {
    // open authentication modal
    page.navigateTo();
    page.loginButton.click();
  });

  beforeEach(() => {
    // login admin user
    const authModal = new AuthModal();
    authModal.loginAdmin('admin', 'admin');
  });

  it('create diary entry button should be displayed', () => {
    expect(page.createDiaryEntryButton.isDisplayed()).toBe(true);
  });

  afterEach(() => {
    // logout admin user
    page.logoutButton.click();
  });

  afterEach(async () => {
    // assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    expect(logs).not.toContain(jasmine.objectContaining(
      {level: logging.Level.SEVERE} as logging.Entry));
  });
});
