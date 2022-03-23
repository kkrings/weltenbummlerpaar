/**
 * Image with loader component
 * @packageDocumentation
 */

import { Component, Input, OnInit } from '@angular/core';

import { Image } from '../image.model';

/**
 * Image with loader component
 *
 * While the input image is being loaded, a loading image is being rendered.
 * After the input image has been loaded, it is being rendered instead of the
 * loading image.
 */
@Component({
  selector: 'app-image-with-loader',
  templateUrl: './image-with-loader.component.html',
  styleUrls: ['./image-with-loader.component.scss'],
})
export class ImageWithLoaderComponent implements OnInit {
  /**
   * The image that should be rendered.
   */
  @Input() image: Image = {
    id: '',
    description: '',
    createdAt: '',
    updatedAt: '',
  };

  /**
   * String containing CSS classes that are applied to both the loading and the
   * input image
   */
  @Input() class: string = '';

  /**
   * Specifies if the input image is currently being loaded.
   */
  loading = false;

  /**
   * On initialization, it is assumed that the input image has not been loaded
   * yet.
   */
  ngOnInit(): void {
    this.loading = true;
  }

  /**
   * This method is called after the input image has been loaded.
   */
  imageIsLoaded(): void {
    this.loading = false;
  }
}
