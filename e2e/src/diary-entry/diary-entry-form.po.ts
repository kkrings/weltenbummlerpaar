/**
 * Diary entry form
 * @packageDocumentation
 */

import { by, ElementFinder } from 'protractor';


/**
 * Diary entry form
 *
 * This class represents a modal for creating/updating a diary entry.
 */
export class DiaryEntryForm {
  /**
   * Input field for entering the entry's title
   */
  private titleInput: ElementFinder;

  /**
   * Input field for entering the entry's location name
   */
  private locationInput: ElementFinder;

  /**
   * Input field for entering the entry's body
   */
  private bodyInput: ElementFinder;

  /**
   * Input field for entering the entry's tags
   */
  private tagsInput: ElementFinder;

  /**
   * This button submits the created or edited diary entry to the back-end
   * server.
   */
  private submitButton: ElementFinder;

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
   * @param title
   *   Diary entry's title
   * @param locationName
   *   Diary entry's location name
   * @param body
   *   Diary entry's body
   * @param tags
   *   Diary entry's comma-separated list of tags
   */
  createDiaryEntry(diaryEntry: {
    title: string,
    locationName: string,
    body: string,
    tags: string
  }): void {
    this.titleInput.sendKeys(diaryEntry.title);
    this.locationInput.sendKeys(diaryEntry.locationName);
    this.bodyInput.sendKeys(diaryEntry.body);
    this.tagsInput.sendKeys(diaryEntry.tags);
    this.submitButton.click();
  }
}
