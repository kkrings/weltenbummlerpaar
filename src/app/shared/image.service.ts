/**
 * Image service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';

import { Image } from './image.model';
import { environment } from '../../environments/environment';


/**
 * Service for loading images from back-end server
 */
@Injectable({
  providedIn: 'root',
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
    return `${environment.baseurl}/images/${image._id}.jpg`;
  }

  /**
   * Construct image service.
   */
  constructor() { }
}
