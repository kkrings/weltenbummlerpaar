/**
 * Diary entry modal
 * @packageDocumentation
 */

import { by, ElementFinder } from 'protractor';


/**
 * Diary entry modal
 *
 * This class represents the application's modal that shows a diary entry.
 */
export class DiaryEntryModal {
  /**
   * Create a new DiaryEntryModal instance.
   *
   * @param modal
   *   The modal that shows a diary entry
   */
  constructor(private modal: ElementFinder) { }

  /**
   * Diary entry's title
   */
  get diaryEntryTitle(): ElementFinder {
    return this.modal.element(by.className('modal-title'));
  }

  /**
   * Diary entry's location name
   */
  get diaryEntryLocationName(): ElementFinder {
    return this.modal
      .element(by.className('modal-body'))
      .element(by.tagName('h6'));
  }

  /**
   * Diary entry's body
   */
  get diaryEntryBody(): ElementFinder {
    return this.modal
      .element(by.className('modal-body'))
      .all(by.tagName('p'))
      .first();
  }

  /**
   * Close the modal.
   */
  closeModal(): void {
    const closeButton = this.modal
      .element(by.className('modal-footer'))
      .element(by.tagName('button'));

    closeButton.click();
  }
}
