import { Injectable } from '@angular/core';

import { Image } from './image.model';


/**
 * Load image objects from server.
 */
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  /**
   * Get image's URL.
   *
   * @param image
   *   Image object
   *
   * @returns
   *   Image's URL
   */
  static getImageUrl(image: Image): string {
    return 'assets/images/' + image._id + '.jpg';
  }

  /**
   * Construct image service.
   */
  constructor() { }
}
