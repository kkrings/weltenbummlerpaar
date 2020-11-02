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
   * Create a new instance.
   *
   * @param modal
   *   The modal for uploading/updating images
   */
  constructor(modal: ElementFinder) {
    this.uploads = modal.all(by.css('app-image-upload'));
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
   * Find an image's corresponding image upload element.
   *
   * @param description
   *   Image's description
   *
   * @returns
   *   Image
   */
  findImageUpload(description: string): ImageUpload {
    const uploads = this.uploads.filter(async form => {
      const upload = new ImageUpload(form);
      return await upload.description === description;
    });

    return new ImageUpload(uploads.first());
  }
}
