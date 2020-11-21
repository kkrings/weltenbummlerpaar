/**
 * Diary entry form
 * @packageDocumentation
 */

import { by, ElementFinder } from 'protractor';

import { DiaryEntry } from './diary-entry-model.po';


/**
 * Diary entry form
 *
 * This class represents a modal for creating/updating a diary entry.
 */
export class DiaryEntryForm {
  /**
   * Input field for entering the entry's title
   */
  titleInput: ElementFinder;

  /**
   * Input field for entering the entry's location name
   */
  locationInput: ElementFinder;

  /**
   * Input field for entering the entry's body
   */
  bodyInput: ElementFinder;

  /**
   * Input field for entering the entry's tags
   */
  tagsInput: ElementFinder;

  /**
   * This button submits the created or edited diary entry to the back-end
   * server.
   */
  submitButton: ElementFinder;

  /**
   * Create a new instance.
   *
   * @param:
   *   The modal for creating/updating a diary entry
   */
  constructor(modal: ElementFinder) {
    this.titleInput = modal.element(by.id('title'));
    this.locationInput = modal.element(by.id('location'));
    this.bodyInput = modal.element(by.id('body'));
    this.tagsInput = modal.element(by.id('tags'));
    this.submitButton = modal.element(by.css('button[type="submit"]'));
  }

  /**
   * Create a diary entry.
   *
   * @param diaryEntry
   *   Diary entry
   */
  async createDiaryEntryAsync(diaryEntry: DiaryEntry): Promise<void> {
    await this.titleInput.sendKeys(diaryEntry.title);
    await this.locationInput.sendKeys(diaryEntry.location);
    await this.bodyInput.sendKeys(diaryEntry.body);
    // await this.tagsInput.sendKeys(diaryEntry.tags);
    await this.submitButton.click();
  }
}
