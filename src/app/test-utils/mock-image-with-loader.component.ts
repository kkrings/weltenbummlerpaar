/**
 * Mock image with loader component
 * @packageDocumentation
 */

import { Component, Input } from '@angular/core';

import { Image } from '../image/image.model';

/**
 * Mock image with loader component
 */
@Component({
  selector: 'app-image-with-loader',
  template: '<img [appImage]="image" [class]="class" />',
})
export class MockImageWithLoaderComponent {
  /**
   * Mock input image
   */
  @Input() image: Image = {
    id: '',
    description: '',
    createdAt: '',
    updatedAt: '',
  };

  /**
   * Mock input CSS classes
   */
  @Input() class = '';
}
