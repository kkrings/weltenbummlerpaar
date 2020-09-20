/**
 * Full integration tests
 * @packageDocumentation
 */

import { browser, logging } from 'protractor';

import { AppPage } from './app.po';
import { AuthModal } from './auth-modal.po';
import { DiaryEntryFormModal } from './diary-entry-form-modal.po';


describe('weltenbummlerpaar', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
  });

  it('run end-to-end test', () => {
    page.navigateToRoot();

    const numDiaryEntries = page.getNumDiaryEntries();

    loginAdmin();
    expect(page.createDiaryEntryButton.isDisplayed()).toBe(true);

    createDiaryEntry();
    expect(page.getNumDiaryEntries()).toBeGreaterThan(numDiaryEntries);

    deleteNewestDiaryEntry();
    expect(page.getNumDiaryEntries()).toEqual(numDiaryEntries);

    logoutAdmin();
  });

  afterAll(async () => {
    // assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    expect(logs).not.toContain(jasmine.objectContaining(
      {level: logging.Level.SEVERE} as logging.Entry));
  });

  function loginAdmin(): void {
    page.loginButton.click();
    const authModal = new AuthModal();
    authModal.loginAdmin('admin', 'admin');
  }

  function createDiaryEntry(): void {
    page.createDiaryEntryButton.click();

    const diaryEntryFormModal = new DiaryEntryFormModal();

    diaryEntryFormModal.createDiaryEntry(
      'some title',
      'some location',
      'some body',
      'some tag, some other tag');

    page.refresh();
  }

  function deleteNewestDiaryEntry(): void {
    page.deleteNewestDiaryEntry();
    page.refresh();
  }

  function logoutAdmin(): void {
    page.logoutButton.click();
  }
});
