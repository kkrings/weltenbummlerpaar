/**
 * Image upload
 * @packageDocumentation
 */

import { by, ElementFinder } from 'protractor';


/**
 * Image upload
 *
 * This class represents a form for uploading/deleting an image.
 */
export class ImageUpload {
  /**
   * Input for choosing the image that should be uploaded
   */
  private fileInput: ElementFinder;

  /**
   * Input for entering the image's description
   */
  private descriptionInput: ElementFinder;

  /**
   * This button submits the image to the back-end server.
   */
  private submitButton: ElementFinder;

  /**
   * This button requests the image's deletion from the back-end server.
   */
  private deleteButton: ElementFinder;

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
   */
  get description(): Promise<string> {
    return this.descriptionInput.getAttribute('value') as Promise<string>;
  }

  /**
   * Upload/update the image.
   *
   * @param filePath
   *   Path to image
   * @param description
   *   Image's description
   */
  uploadOrUpdateImage(image: { filePath: string, description: string }): void {
    this.fileInput.sendKeys(image.filePath);
    this.descriptionInput.sendKeys(image.description);
    this.submitButton.click();
  }

  /**
   * Delete the image.
   */
  deleteImage(): void {
    this.deleteButton.click();
  }
}
