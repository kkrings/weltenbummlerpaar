/**
 * Image carousel
 * @packageDocumentation
 */

import { by, ElementFinder, ElementArrayFinder } from 'protractor';

import { Image, RemoteImage } from './image-model.po';


/**
 * Image carousel item
 *
 * This class represents the figure element that each of the image carousel
 * items contains.
 */
export class ImageCarouselItem {
  /**
   * Figure's caption
   */
  caption: ElementFinder;

   /**
    * Figure's image
    */
  image: ElementFinder;

  /**
   * Create a new instance
   *
   * @param figure
   *   The figure element that contains the image
   */
  constructor(figure: ElementFinder) {
    this.caption = figure.element(by.css('.figure-caption'));
    this.image = figure.element(by.css('.figure-img'));
  }

  /**
   * Figure's caption
   *
   * @returns
   *   Figure's caption
   */
  async getCaptionAsync(): Promise<string> {
    return await this.caption.getText();
  }

  /**
   * Figure's image
   *
   * @returns
   *   Figure's image
   */
  async getImageAsync(): Promise<RemoteImage> {
    return {
      url: await this.image.getAttribute('src'),
      width: parseFloat(await this.image.getAttribute('naturalWidth')),
      height: parseFloat(await this.image.getAttribute('naturalHeight'))
    };
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
  items: ElementArrayFinder;

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

  /**
   * Images
   *
   * @returns
   *   List of images
   */
  async getImagesAsync(): Promise<Image[]> {
    const length = await this.items.count();

    const images: Image[] = [];

    for (let i = 0; i < length; ++i) {
      const figure = this.getItem(i);
      const description = await figure.getCaptionAsync();
      images.push({ description });
    }

    return images;
  }
}
