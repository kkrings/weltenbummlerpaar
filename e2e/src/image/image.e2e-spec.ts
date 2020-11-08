/**
 * Image end-to-end testing
 * @packageDocumentation
 */

import * as utils from '../app-utils.po';
import { AppPage } from '../app.po';
import { DiaryEntryCard } from '../diary-entry/diary-entry-card.po';
import { DiaryEntryModal } from '../diary-entry/diary-entry-modal.po';
import { ImageCarousel, ImageCarouselItem } from './image-carousel.po';


describe('image:', () => {
  let page: AppPage;
  let diaryEntryCard: DiaryEntryCard;

  beforeAll(() => {
    page = new AppPage();
  });

  beforeAll(() => {
    page.navigateToRoot();
  });

  beforeAll(() => {
    utils.loginAdmin(page);
  });

  beforeAll(() => {
    const diaryEntry = utils.DIARY_ENTRY;
    utils.createDiaryEntry(page, diaryEntry);
  });

  beforeAll(() => {
    diaryEntryCard = page.getFirstDiaryEntry();
  });

  describe('before image is uploaded', () => {
    let diaryEntryModal: DiaryEntryModal;

    beforeAll(() => {
      diaryEntryModal = diaryEntryCard.openDiaryEntryModal();
    });

    it('image carousel should not be present', () => {
      expect(diaryEntryModal.imageCarousel.isPresent()).toBeFalsy();
    });

    afterAll(() => {
      diaryEntryModal.closeModal();
    });
  });

  describe('after image is uploaded', () => {
    const image = utils.IMAGES[0];

    beforeAll(() => {
      const imageModal = diaryEntryCard.openImageModal();
      imageModal.uploadImage(image);
      imageModal.closeModal();
    });

    beforeAll(() => {
      page.refresh();
    });

    describe('after diary entry is opened', () => {
      let diaryEntryModal: DiaryEntryModal;
      let diaryEntryImageCarousel: ImageCarousel;
      let diaryEntryImage: ImageCarouselItem;

      beforeAll(() => {
        diaryEntryModal = diaryEntryCard.openDiaryEntryModal();
        diaryEntryImageCarousel = diaryEntryModal.diaryEntryImages;
        diaryEntryImage = diaryEntryImageCarousel.getItem(0);
      });

      it('image carousel should be present', () => {
        expect(diaryEntryModal.imageCarousel.isPresent()).toBeTruthy();
      });

      it('image carousel should only contain one image', () => {
        expect(diaryEntryImageCarousel.numItems).toEqual(1);
      });

      it('check figure caption', () => {
        expect(diaryEntryImage.caption.getText()).toEqual(image.description);
      });

      it('check image width', () => {
        const width = diaryEntryImage.image.getAttribute('naturalWidth');
        expect(width).toEqual('2500');
      });

      afterAll(() => {
        diaryEntryModal.closeModal();
      });
    });

    describe('after image is deleted', () => {
      let diaryEntryModal: DiaryEntryModal;

      beforeAll(() => {
        const imageModal = diaryEntryCard.openImageModal();
        const imageUpload = imageModal.getImageUpload(0);
        imageUpload.deleteImage();
        imageModal.closeModal();
      });

      beforeAll(() => {
        diaryEntryModal = diaryEntryCard.openDiaryEntryModal();
      });

      it('image carousel should not be present', () => {
        expect(diaryEntryModal.imageCarousel.isPresent()).toBeFalsy();
      });

      afterAll(() => {
        diaryEntryModal.closeModal();
      });
    });
  });

  // this is a workaround for deleting the diary entry
  // it does not in an 'afterAll'
  describe('after diary entry is deleted', () => {
    beforeAll(() => {
      diaryEntryCard.deleteDiaryEntry();
    });

    it('dummy test', () => {
      expect(true).toBeTruthy();
    });
  });

  afterAll(() => {
    page.logoutAdmin();
  });

  afterAll(utils.checkBrowserLogsForErrors);
});
