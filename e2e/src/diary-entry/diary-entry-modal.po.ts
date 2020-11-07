/**
 * Diary entry modal
 * @packageDocumentation
 */

import { by, ElementFinder } from 'protractor';

import { ImageCarousel } from '../image/image-carousel.po';


/**
 * Diary entry modal
 *
 * This class represents a modal that shows a diary entry.
 */
export class DiaryEntryModal {
  /**
   * Image carousel
   */
  imageCarousel: ElementFinder;

  /**
   * Create a new instance.
   *
   * @param modal
   *   The modal that shows a diary entry
   */
  constructor(private modal: ElementFinder) {
    this.imageCarousel = this.modal.element(by.css('app-image-carousel'));
  }

  /**
   * Diary entry's title
   */
  get diaryEntryTitle(): ElementFinder {
    return this.modal.element(by.css('.modal-title'));
  }

  /**
   * Diary entry's location name
   */
  get diaryEntryLocationName(): ElementFinder {
    return this.modal
      .element(by.css('.modal-body'))
      .element(by.css('h6'));
  }

  /**
   * Diary entry's body
   */
  get diaryEntryBody(): ElementFinder {
    return this.modal
      .element(by.css('.modal-body'))
      .all(by.css('p'))
      .first();
  }

  /**
   * Diary entrys' images
   */
  get diaryEntryImages(): ImageCarousel {
    return new ImageCarousel(this.imageCarousel);
  }

  /**
   * Close the modal.
   */
  closeModal(): void {
    const closeButton = this.modal
      .element(by.css('.modal-footer'))
      .element(by.css('button'));

    closeButton.click();
  }
}
