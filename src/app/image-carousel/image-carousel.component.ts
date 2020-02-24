import { Component, OnInit, Input } from '@angular/core';

import { Image } from '../shared/image.model';
import { ImageService } from '../shared/image.service';


/**
 * Show diary entry's images in a Bootstrap carousel.
 */
@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {
  /**
   * List of images to show in image carousel
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
