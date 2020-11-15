/**
 * Diary entry modal
 * @packageDocumentation
 */

import { by, ElementFinder } from 'protractor';

import { Image } from '../image/image-model.po';
import { ImageCarousel } from '../image/image-carousel.po';
import { DiaryEntry } from '../diary-entry/diary-entry-model.po';


/**
 * Diary entry modal
 *
 * This class represents a modal that shows a diary entry.
 */
export class DiaryEntryModal {
  /**
   * Diary entry's title
   */
  entryTitle: ElementFinder;

  /**
   * Diary entry's location
   */
  entryLocation: ElementFinder;

  /**
   * Diary entry's body
   */
  entryBody: ElementFinder;

  /**
   * Image carousel
   */
  imageCarousel: ImageCarousel;

  /**
   * Button for closing the modal
   */
  closeModalButton: ElementFinder;

  /**
   * Create a new instance.
   *
   * @param modal
   *   The modal that shows a diary entry
   */
  constructor(modal: ElementFinder) {
    this.entryTitle = modal.element(by.css('.modal-title'));

    const body = modal.element(by.css('.modal-body'));
    this.entryLocation = body.element(by.css('h6'));
    this.entryBody = body.all(by.css('p')).first();

    const carousel = body.element(by.css('app-image-carousel'));
    this.imageCarousel = new ImageCarousel(carousel);

    const footer = modal.element(by.css('.modal-footer'));
    this.closeModalButton = footer.element(by.css('button'));
  }

  /**
   * Diary entry's title
   *
   *  @returns
   *    Diary entry's title
   */
  async getEntryTitleAsync(): Promise<string> {
    return await this.entryTitle.getText();
  }

  /**
   * Diary entry's location name
   *
   *  @returns
   *    Diary entry's location
   */
  async getEntryLocationAsync(): Promise<string> {
    return await this.entryLocation.getText();
  }

  /**
   * Diary entry's body
   *
   *  @returns
   *    Diary entry's body
   */
  async getEntryBodyAsync(): Promise<string> {
    return await this.entryBody.getText();
  }

  /**
   * Diary entry's images
   *
   *  @returns
   *    Diary entry's images
   */
  async getEntryImagesAsync(): Promise<Image[]> {
    return await this.imageCarousel.getImagesAsync();
  }

  /**
   * Diary entry
   *
   * @returns
   *   Diary entry
   */
  async getEntryAsync(): Promise<DiaryEntry> {
    return {
      title: await this.getEntryTitleAsync(),
      locationName: await this.getEntryLocationAsync(),
      body: await this.getEntryBodyAsync(),
      images: await this.getEntryImagesAsync(),
    };
  }

  /**
   * Close the modal.
   */
  async closeModalAsync(): Promise<void> {
    await this.closeModalButton.click();
  }
}
