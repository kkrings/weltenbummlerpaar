/**
 * Image carousel
 * @packageDocumentation
 */

import { by, ElementFinder, ElementArrayFinder } from 'protractor';

import { RemoteImage } from './image-model.po';


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
  constructor(item: ElementFinder) {
    const figure = item.element(by.css('figure'));
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
      height: parseFloat(await this.image.getAttribute('naturalHeight')),
      description: await this.getCaptionAsync()
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
   * Button for showing the next item
   */
  nextButton: ElementFinder;

  /**
   * Create a new instance.
   *
   * @param carousel
   *   The image carousel
   */
  constructor(private carousel: ElementFinder) {
    this.items = this.carousel.all(by.css('.carousel-item'));
    this.nextButton = this.carousel.element(by.css('.carousel-control-next'));
  }

  /**
   * Get the active carousel item.
   *
   * @returns
   *   Carousel item
   */
  getActiveItem(): ImageCarouselItem {
    return new ImageCarouselItem(this.carousel.element(by.css('.active')));
  }

  /**
   * Images
   *
   * @returns
   *   List of images
   */
  async getImagesAsync(): Promise<RemoteImage[]> {
    const length = await this.items.count();

    const images: RemoteImage[] = [];

    for (let i = 0; i < length; ++i) {
      images.push(await this.getActiveItem().getImageAsync());
      await this.nextButton.click();
    }

    return images;
  }
}
