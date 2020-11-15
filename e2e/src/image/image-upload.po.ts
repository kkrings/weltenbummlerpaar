/**
 * Image upload
 * @packageDocumentation
 */

import { by, ElementFinder } from 'protractor';

import { Image } from './image-model.po';


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
   * Image's description
   *
   * @returns
   *   Image's description
   */
  async getDescriptionAsync(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  /**
   * Upload/update the image.
   *
   * @param image
   *   Image
   * @param file
   *   Path to image
   */
  async uploadOrUpdateImageAsync(image: Image, file?: string): Promise<void> {
    if (file) {
      await this.fileInput.sendKeys(file);
    }
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
