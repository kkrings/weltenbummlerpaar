/**
 * Mock image directive
 * @packageDocumentation
 */

import { Directive, Input } from '@angular/core';

/**
 * Mock image directive
 */
@Directive({
  selector: '[appImage]',
})
export class MockImageDirective {
  /**
   * Mock image
   */
  @Input('appImage') mockImage = null;
}
