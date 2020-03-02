/**
 * Image carousel component
 * @packageDocumentation
 */

import { Component, OnInit, Input } from '@angular/core';

import { Image } from '../shared/image.model';
import { ImageService } from '../shared/image.service';


/**
 * Present diary entry's images via a Bootstrap carousel.
 */
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  /**
   * List of images to show in carousel
   */
  @Input() images: Image[];

  /**
   * Construct image carousel component.
   */
  constructor() { }

  /**
   * Initialize image carousel component.
   */
  ngOnInit() {
  }

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
