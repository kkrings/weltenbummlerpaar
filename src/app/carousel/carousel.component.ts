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
  selector: 'app-img-slider',
  templateUrl: './img-slider.component.html',
  styleUrls: ['./img-slider.component.scss']
})
export class ImgSliderComponent implements OnInit {
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
    if (this.imageList.length > 0) {
      this.activeImage = this.imageList[this.activeIndex];
    }
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
   * Move on to the next image. Wrap around the last image.
   */
  nextImage() {
    // do nothing if list of images is empty
    if (this.imageList.length < 1) {
      return;
    }

    // increment index; wrap around last image
    this.activeIndex = ((this.activeIndex < this.imageList.length) ?
        this.activeIndex : 0) + 1;

    this.activeImage = this.imageList[this.activeIndex];
  }

  /**
   * Go back to the previous image. Wrap around the first image.
   */
  prevImage() {
    // do nothing if list of images is empty
    if (this.imageList.length < 1) {
      return;
    }

    // decrement index; wrap around first image
    this.activeIndex = ((this.activeIndex > 0) ?
        this.activeIndex : this.imageList.length) - 1;

    this.activeImage = this.imageList[this.activeIndex];
  }
}
