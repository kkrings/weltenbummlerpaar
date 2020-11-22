/**
 * Diary entry card
 * @packageDocumentation
 */

import { element, by, ElementFinder } from 'protractor';

import { DiaryEntryModal } from './diary-entry-modal.po';
import { DiaryEntryForm } from './diary-entry-form.po';
import { LocalImage } from '../image/image-model.po';
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
  private openEntryModalButton: ElementFinder;

  /**
   * Button for opening the modal for updating the diary entry
   */
   private openUpdateEntryModalButton: ElementFinder;

  /**
   * Button for opening the diary entry's image modal
   */
  private openImageModalButton: ElementFinder;

  /**
   * Button for deleting the diary entry
   */
  private deleteButton: ElementFinder;

  /**
   * Create a new instance.
   *
   * @param card
   *   The card that shows a diary entry
   */
  constructor(card: ElementFinder) {
    this.openEntryModalButton = card
      .element(by.css('.card-body'))
      .element(by.css('.btn-primary'));

    const header = card.element(by.css('.card-header'));
    this.openUpdateEntryModalButton = header.element(by.css('.btn-primary'));
    this.openImageModalButton = header.element(by.css('.btn-secondary'));
    this.deleteButton = header.element(by.css('.btn-danger'));
  }

  /**
   * Open the modal that shows the diary entry
   *
   * @returns
   *   The modal that shows the diary entry
   */
  async openEntryModalAsync(): Promise<DiaryEntryModal> {
    await this.openEntryModalButton.click();
    return new DiaryEntryModal(element(by.css('app-diary-entry-modal')));
  }

  /**
   * Open the modal that for updating the diary entry
   *
   * @returns
   *   The modal for updating the diary entry
   */
  async openUpdateEntryModalAsync(): Promise<DiaryEntryForm> {
    await this.openUpdateEntryModalButton.click();
    return new DiaryEntryForm(element(by.css('app-diary-entry-form')));
  }

  /**
   * Open the modal for uploading/updating images.
   *
   * @returns
   *   The modal for uploading/updating images
   */
  async openImageModalAsync(): Promise<ImageModal> {
    await this.openImageModalButton.click();
    return new ImageModal(element(by.css('app-image-modal')));
  }

  /**
   * Upload images.
   *
   * @param images
   *   List of images
   */
  async uploadImagesAsync(images: LocalImage[]): Promise<void> {
    const modal = await this.openImageModalAsync();

    for (const image of images) {
      await modal.uploadImageAsync(image);
    }

    await modal.closeModalAsync();
  }

  /**
   * Delete the diary entry.
   */
  async deleteDiaryEntryAsync(): Promise<void> {
    await this.deleteButton.click();
  }
}
