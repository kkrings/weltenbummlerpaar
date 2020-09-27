/**
 * Image carousel component
 * @packageDocumentation
 */

import { Component, Input } from '@angular/core';

import { Image } from '../image.model';


/**
 * Image carousel component
 *
 * This component presents a list of images to the user via Bootstrap's
 * carousel component.
 */
@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent {
  /**
   * List of images to show in carousel
   */
  @Input() imageList: Image[] = [];

  /**
   * Convert carousel's active ID to image number.
   *
   * @param activeId
   *   Carousel's active ID
   *
   * @returns
   *   Image number
   */
  getImageNumber(activeId: string): string {
    return `${parseInt(activeId, 10) + 1}`;
  }
}
