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
  submitButton: ElementFinder;

  /**
   * Create a new instance.
   *
   * @param:
   *   The modal for creating/updating a diary entry
   */
  constructor(private modal: ElementFinder) {
    this.titleInput = modal.element(by.id('title'));
    this.locationInput = modal.element(by.id('location'));
    this.bodyInput = modal.element(by.id('body'));
    this.tagsInput = modal.element(by.id('tags'));
    this.submitButton = modal.element(by.css('button[type="submit"]'));
  }

  /**
   * Fill the form with values from the given diary entry.
   *
   * @param diaryEntry
   *   Diary entry
   */
  async fillFormAsync(diaryEntry: DiaryEntry): Promise<void> {
    await this.setTitleAsync(diaryEntry.title);
    await this.setLocationAsync(diaryEntry.location);
    await this.setBodyAsync(diaryEntry.body);
    // await this.setTagsAsync(diaryEntry.tags);
  }

  /**
   * Set diary entry's title.
   *
   * @param title
   *   Diary entry's title
   */
  async setTitleAsync(title: string): Promise<void> {
    await this.titleInput.clear();
    await this.titleInput.sendKeys(title);
  }

  /**
   * Set diary entry's location.
   *
   * @param location
   *   Diary entry's location
   */
  async setLocationAsync(location: string): Promise<void> {
    await this.locationInput.clear();
    await this.locationInput.sendKeys(location);
  }

  /**
   * Set diary entry's body.
   *
   * @param body
   *   Diary entry's body
   */
  async setBodyAsync(body: string): Promise<void> {
    await this.bodyInput.clear();
    await this.bodyInput.sendKeys(body);
  }

  /**
   * Set diary entry's tags.
   *
   * @param tags
   *   Diary entry's tags
   */
  async setTagsAsync(tags: string): Promise<void> {
    await this.tagsInput.clear();
    await this.tagsInput.sendKeys(tags);
  }

  /**
   * Move image up in vertial list of diary entry's images.
   *
   * @param imageIndex
   *   Image's current list index
   */
  async moveImageUpAsync(imageIndex: number): Promise<void> {
    const moveImageUpbutton = this.modal
      .all(by.css('.btn.btn-primary.btn-sm'))
      .get(imageIndex);

    await moveImageUpbutton.click();
  }

  /**
   * Move image down in vertial list of diary entry's images.
   *
   * @param imageIndex
   *   Image's current list index
   */
  async moveImageDownAsync(imageIndex: number): Promise<void> {
    const moveImageDownButton = this.modal
      .all(by.css('.btn.btn-primary.btn-sm.ml-1'))
      .get(imageIndex);

    await moveImageDownButton.click();
  }

  /**
   * Submit the diary entry form.
   */
  async submitFormAsync(): Promise<void> {
    await this.submitButton.click();
  }
}
