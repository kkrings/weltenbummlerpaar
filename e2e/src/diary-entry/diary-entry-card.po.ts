/**
 * Diary entry card
 * @packageDocumentation
 */

import { element, by, ElementFinder } from 'protractor';

import { DiaryEntryModal } from './diary-entry-modal.po';
import { ImageModal } from '../image/image-modal.po';


/**
 * Diary entry card
 *
 * This class represents a card that shows a diary entry.
 */
export class DiaryEntryCard {
  /**
   * Button for opening the diary entry's modal
   */
  openModalButton: ElementFinder;

  /**
   * Button for opening the diary entry's image modal
   */
  openImageModalButton: ElementFinder;

  /**
   * Button for deleting the diary entry
   */
  deleteButton: ElementFinder;

  /**
   * Create a new instance.
   *
   * @param card
   *   The card that shows a diary entry
   */
  constructor(card: ElementFinder) {
    this.openModalButton = card
      .element(by.css('.card-body'))
      .element(by.css('.btn-primary'));

    this.openImageModalButton = card
      .element(by.css('.card-header'))
      .element(by.css('.btn-secondary'));

    this.deleteButton = card.element(by.css('.btn-danger'));
  }

  /**
   * Open the modal that shows the diary entry
   *
   * @returns
   *   The modal that shows the diary entry
   */
  openDiaryEntryModal(): DiaryEntryModal {
    this.openModalButton.click();
    return new DiaryEntryModal(element(by.css('app-diary-entry-modal')));
  }

  /**
   * Open the modal for uploading/updating images.
   *
   * @returns
   *   The modal for uploading/updating images
   */
  openImageModal(): ImageModal {
    this.openImageModalButton.click();
    return new ImageModal(element(by.css('app-image-modal')));
  }

  /**
   * Delete the diary entry.
   */
  deleteDiaryEntry(): void {
    this.deleteButton.click();
  }
}
