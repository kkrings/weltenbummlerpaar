/**
 * Full integration tests
 * @packageDocumentation
 */

import { browser, logging } from 'protractor';

import { AppPage } from './app.po';


describe('weltenbummlerpaar', () => {
  let page: AppPage;

  const diaryEntry = {
    title: 'some title',
    locationName: 'some location',
    body: 'some body',
    tags: 'some tag, some other tag'
  };

  beforeAll(() => {
    page = new AppPage();
  });

  it('run end-to-end test', () => {
    page.navigateToRoot();

    const numDiaryEntries = page.getNumDiaryEntries();

    loginAdmin();
    expect(page.openDiaryEntryFormButton.isDisplayed()).toBe(true);

    createDiaryEntry();
    expect(page.getNumDiaryEntries()).toBeGreaterThan(numDiaryEntries);

    checkDiaryEntry();

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
    const authModal = page.openAuthModal();
    authModal.loginAdmin('admin', 'admin');
  }

  function createDiaryEntry(): void {
    const diaryEntryForm = page.openDiaryEntryForm();
    diaryEntryForm.createDiaryEntry(diaryEntry);
    page.refresh();
  }

  function checkDiaryEntry(): void {
    const diaryEntryModal = page.getFirstDiaryEntry().openDiaryEntryModal();

    expect(diaryEntryModal.diaryEntryTitle.getText())
      .toEqual(diaryEntry.title);

    expect(diaryEntryModal.diaryEntryLocationName.getText())
      .toEqual(diaryEntry.locationName);

    expect(diaryEntryModal.diaryEntryBody.getText())
      .toEqual(diaryEntry.body);

    diaryEntryModal.closeModal();
  }

  function deleteNewestDiaryEntry(): void {
    page.getFirstDiaryEntry().deleteDiaryEntry();
    page.refresh();
  }

  function logoutAdmin(): void {
    page.logoutButton.click();
  }
});
