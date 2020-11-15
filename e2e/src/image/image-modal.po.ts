/**
 * Image modal
 * @packageDocumentation
 */

import { by, ElementArrayFinder, ElementFinder } from 'protractor';

import { Image } from './image-model.po';
import { ImageUpload } from './image-upload.po';


/**
 * Image modal
 *
 * This class represents a modal for uploading/updating images.
 */
export class ImageModal {
  /**
   * Image upload elements
   */
  uploads: ElementArrayFinder;

  /**
   * Button for closing the modal
   */
  closeButton: ElementFinder;

  /**
   * Create a new instance.
   *
   * @param modal
   *   The modal for uploading/updating images
   */
  constructor(modal: ElementFinder) {
    this.uploads = modal.all(by.css('app-image-upload'));

    this.closeButton = modal
      .element(by.css('.modal-footer'))
      .element(by.css('button'));
  }

  /**
   * Upload an image.
   *
   * @param image
   *   Image
   * @param file
   *   Path to image
   */
  async uploadImageAsync(image: Image, file: string): Promise<void> {
    const upload = new ImageUpload(this.uploads.first());
    await upload.uploadOrUpdateImageAsync(image, file);
  }

  /**
   * Get the image's corresponding image upload element.
   *
   * @param index
   *   Image's index
   *
   * @returns
   *   Image
   */
  getImageUpload(index: number): ImageUpload {
    return new ImageUpload(this.uploads.get(1 + index));
  }

  /**
   * Close the modal.
   */
  async closeModalAsync(): Promise<void> {
    await this.closeButton.click();
  }
}
