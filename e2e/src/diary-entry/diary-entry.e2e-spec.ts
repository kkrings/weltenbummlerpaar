/**
 * Diary entry end-to-end testing
 * @packageDocumentation
 */

import * as utils from '../app-utils.po';
import { AppPage } from '../app.po';
import { DiaryEntryCard } from './diary-entry-card.po';
import { DiaryEntryModal } from './diary-entry-modal.po';


describe('diary entry:', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
  });

  beforeAll(() => {
    page.navigateToRoot();
  });

  describe('before diary entry is created', () => {
    it('page should show zero diary entries', () => {
      expect(page.getNumDiaryEntries()).toEqual(0);
    });
  });

  describe('after diary entry is created', () => {
    const diaryEntry = utils.DIARY_ENTRY;
    let diaryEntryCard: DiaryEntryCard;

    beforeAll(() => {
      utils.loginAdmin(page);
      utils.createDiaryEntry(page, diaryEntry);
    });

    beforeAll(() => {
      page.refresh();
    });

    beforeAll(() => {
      diaryEntryCard = page.getFirstDiaryEntry();
    });

    it('page should show one diary entry', () => {
      expect(page.getNumDiaryEntries()).toEqual(1);
    });

    describe('after diary entry is opened', () => {
      let diaryEntryModal: DiaryEntryModal;

      beforeAll(() => {
        diaryEntryModal = diaryEntryCard.openDiaryEntryModal();
      });

      it('check diary entry title', () => {
        expect(diaryEntryModal.diaryEntryTitle.getText())
          .toEqual(diaryEntry.title);
      });

      it('check diary entry location', () => {
        expect(diaryEntryModal.diaryEntryLocationName.getText())
          .toEqual(diaryEntry.locationName);
      });

      it('check diary entry body', () => {
        expect(diaryEntryModal.diaryEntryBody.getText())
          .toEqual(diaryEntry.body);
      });

      afterAll(() => {
        diaryEntryModal.closeModal();
      });
    });

    describe('after diary entry is deleted', () => {
      beforeAll(() => {
        diaryEntryCard.deleteDiaryEntry();
      });

      beforeAll(() => {
        page.logoutAdmin();
        page.refresh();
      });

      it('page should show zero diary entries', () => {
        expect(page.getNumDiaryEntries()).toEqual(0);
      });
    });
  });

  afterAll(utils.checkBrowserLogsForErrors);
});
