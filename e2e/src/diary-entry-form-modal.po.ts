/**
 * Diary entry form modal
 * @packageDocumentation
 */

import { by, element } from 'protractor';


/**
 * Diary entry form modal
 *
 * This class represents the application's modal for creating or editing a
 * diary entry.
 */
export class DiaryEntryFormModal {
  /**
   * Input field for entering the entry's title
   */
  titleInput = element(by.id('title'));

  /**
   * Input field for entering the entry's location name
   */
  locationInput = element(by.id('location'));

  /**
   * Input field for entering the entry's body
   */
  bodyInput = element(by.id('body'));

  /**
   * Input field for entering the entry's tags
   */
  tagsInput = element(by.id('tags'));

  /**
   * This button submits the created or edited diary entry to the back-end
   * server.
   */
  submitButton = element(by.css('button[type="submit"]'));

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
