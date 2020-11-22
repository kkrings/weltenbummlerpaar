/**
 * Image upload
 * @packageDocumentation
 */

import { by, ElementFinder } from 'protractor';

import { LocalImage } from './image-model.po';


/**
 * Image upload
 *
 * This class represents a form for uploading/deleting an image.
 */
export class ImageUpload {
  /**
   * Input for choosing the image that should be uploaded
   */
  fileInput: ElementFinder;

  /**
   * Input for entering the image's description
   */
  descriptionInput: ElementFinder;

  /**
   * This button submits the image to the back-end server.
   */
  submitButton: ElementFinder;

  /**
   * This button requests the image's deletion from the back-end server.
   */
  deleteButton: ElementFinder;

  /**
   * Construct a new instance
   *
   * @param form
   *   The form for uploading an image
   */
  constructor(form: ElementFinder) {
    this.fileInput = form.element(by.id('files'));
    this.descriptionInput = form.element(by.id('description'));
    this.submitButton = form.element(by.css('button[type="submit"]'));
    this.deleteButton = form.element(by.css('.btn-danger'));
  }

  /**
   * Upload/update the image.
   *
   * @param image
   *   Image
   */
  async uploadOrUpdateImageAsync(image: LocalImage): Promise<void> {
    if (image.file) {
      await this.fileInput.sendKeys(image.file);
    }

    await this.descriptionInput.clear();
    await this.descriptionInput.sendKeys(image.description);
    await this.submitButton.click();
  }

  /**
   * Delete the image.
   */
  async deleteImageAsync(): Promise<void> {
    await this.deleteButton.click();
  }
}
