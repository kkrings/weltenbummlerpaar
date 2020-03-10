/**
 * Image slider component
 * @packageDocumentation
 */

import { Component, OnInit, Input } from '@angular/core';

import { Image } from '../shared/image.model';
import { ImageService } from '../shared/image.service';


/**
 * Present diary entry's images in a carousel.
 */
@Component({
  selector: 'app-entry-img-slider',
  templateUrl: './entry-img-slider.component.html',
  styleUrls: ['./entry-img-slider.component.scss']
})
export class EntryImgSliderComponent implements OnInit {
  /**
   * List of images to show in carousel
   */
  @Input() imageList: Image[];

  /**
   * Active image
   */
  activeImage: Image;

  /**
   * Index of active image
   */
  activeIndex = 0;

  /**
   * Construct image slider component.
   */
  constructor() { }

  /**
   * Initialize image slider component.
   */
  ngOnInit() {
    this.activeImage = this.imageList[this.activeIndex];
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
  imageUrl(image: Image): string {
    return ImageService.getImageUrl(image);
  }

  /**
   * Move on to next image; wrap around last image.
   */
  nextImage() {
    const index = this.activeIndex + 1;
    // wrap around last image
    this.activeIndex = (index < this.imageList.length) ? index : 0;
    this.activeImage = this.imageList[this.activeIndex];
  }

  /**
   * Go back to previous image; wrap around first image.
   */
  prevImage() {
    const index = this.activeIndex - 1;
    // wrap around first image
    this.activeIndex = (index < 0) ? this.imageList.length - 1 : index;
    this.activeImage = this.imageList[this.activeIndex];
  }
}
