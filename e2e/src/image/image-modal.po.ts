/**
 * Image modal
 * @packageDocumentation
 */

import { by, ElementArrayFinder, ElementFinder } from 'protractor';

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
  private uploads: ElementArrayFinder;

  /**
   * Button for closing the modal
   */
  private closeButton: ElementFinder;

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
   * @param filePath
   *   Path to image
   * @param description
   *   Image's description
   */
  uploadImage(image: { filePath: string, description: string }): void {
    const upload = new ImageUpload(this.uploads.first());
    upload.uploadOrUpdateImage(image);
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
  closeModal(): void {
    this.closeButton.click();
  }
}
