/**
 * Image carousel
 * @packageDocumentation
 */

import { by, ElementFinder, ElementArrayFinder } from 'protractor';


/**
 * Image carousel item
 *
 * This class represents the figure element that each of the image carousel
 * items contains.
 */
export class ImageCarouselItem {
  /**
   * Create a new instance
   *
   * @param figure
   *   The figure element that contains the image
   */
  constructor(private figure: ElementFinder) { }

  /**
   * Figure's caption, which shows the image's description
   */
  get caption(): ElementFinder {
    return this.figure.element(by.binding('image.description'));
  }

  /**
   * Figure's image
   */
  get image(): ElementFinder {
    return this.figure.element(by.css('.figure-img'));
  }
}

/**
 * Image carousel
 *
 * This class represents a diary entry's image carousel.
 */
export class ImageCarousel {
  /**
   * Image carousel's items
   */
  private items: ElementArrayFinder;

  /**
   * Create a new instance.
   *
   * @param carousel
   *   The image carousel
   */
  constructor(carousel: ElementFinder) {
    this.items = carousel.all(by.css('figure'));
  }

  /**
   * Get a carousel item by index.
   *
   * @param caption
   *   Item's index
   *
   * @returns
   *   Carousel item
   */
  getItem(index: number): ImageCarouselItem {
    return new ImageCarouselItem(this.items.get(index));
    }
}
