/**
 * Image carousel component
 * @packageDocumentation
 */

import { Component, Input } from '@angular/core';
import { NgbCarouselConfig, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';

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
   * Number of currently shown image
   */
  imageNum = 1;

  constructor(private config: NgbCarouselConfig) {
    this.config.interval = -1;
    this.config.showNavigationIndicators = false;
  }

  /**
   * Convert carousel's active ID to image number.
   *
   * @param slide
   *   Currently shown carousel slide
   */
  setImageNum(slide: NgbSlideEvent): void {
    this.imageNum = parseInt(slide.current, 10) + 1;
  }
}
