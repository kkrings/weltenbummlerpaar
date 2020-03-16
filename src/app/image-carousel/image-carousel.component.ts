/**
 * Image carousel component
 * @packageDocumentation
 */

import { Component, OnInit, Input } from '@angular/core';

import { Image } from '../shared/image.model';
import { ImageService } from '../shared/image.service';


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
export class ImageCarouselComponent implements OnInit {
  /**
   * List of images to show in carousel
   */
  @Input() imageList: Image[];

  /**
   * Construct the image carousel component.
   */
  constructor() { }

  /**
   * Initialize the image carousel component.
   */
  ngOnInit(): void { }

  /**
   * Get image's URL.
   *
   * @param image
   *   Image
   *
   * @returns
   *   Image's URL
   */
  getImageUrl(image: Image): string {
    return ImageService.getImageUrl(image);
  }
}
