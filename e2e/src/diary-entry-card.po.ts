/**
 * Diary entry card
 * @packageDocumentation
 */

import { element, by, ElementFinder } from 'protractor';

import { DiaryEntryModal } from './diary-entry-modal.po';
import { ImageModal } from './image-modal.po';


/**
 * Diary entry card
 *
 * This class represents a card that shows a diary entry.
 */
export class DiaryEntryCard {
  /**
   * Create a new instance.
   *
   * @param card
   *   The card that shows a diary entry
   */
  constructor(private card: ElementFinder) { }

  /**
   * Open the modal that shows the diary entry
   *
   * @returns
   *   The modal that shows the diary entry
   */
  openDiaryEntryModal(): DiaryEntryModal {
    const openModalButton = this.card
      .element(by.css('.card-body'))
      .element(by.css('.btn-primary'));

    openModalButton.click();

    return new DiaryEntryModal(element(by.css('app-diary-entry-modal')));
  }

  /**
   * Open the modal for uploading/updating images.
   *
   * @returns
   *   The modal for uploading/updating images
   */
  openImageModal(): ImageModal {
    const openModalButton = this.card
      .element(by.css('.card-header'))
      .element(by.css('.btn-secondary'));

    openModalButton.click();

    return new ImageModal(element(by.css('app-image-modal')));
  }

  /**
   * Delete the diary entry.
   */
  deleteDiaryEntry(): void {
    const deleteButton = this.card.element(by.css('.btn-danger'));
    deleteButton.click();
  }
}
