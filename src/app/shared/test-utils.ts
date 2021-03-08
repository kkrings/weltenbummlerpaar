/**
 * Utility functions and classes for unit tests
 * @packageDocumentation
 */

import { Directive, Input } from '@angular/core';
import { Observable, defer } from 'rxjs';


/**
 * Mock active modal
 */
export class MockNgbActiveModal {
  /**
   * Mock the active modal's close method.
   */
  close(): void { }
}

/**
 * Mock image directive
 */
@Directive({
  selector: '[appImage]'
})
export class MockImageDirective {
  /**
   * Mock image
   */
  @Input('appImage') mockImage = null;
}

/**
 * Data observable
 *
 * Create an observable that emits the given data once and completes after a JS
 * engine turn.
 *
 * @typeParam T
 *   Data's type
 * @param data
 *   Data
 *
 * @returns
 *   Data observable
 */
export const asyncData = <T>(data: T): Observable<T> => defer(() => Promise.resolve(data));

/**
 * Error observale
 *
 * Create an observable that emit the given error once and completes after a JS
 * engine turn.
 *
 * @typeParam T
 *   Error's type
 * @param error
 *   Error
 *
 * @returns
 *   Error observable
 */
export const asyncError = <T>(error: T): Observable<never> => defer(() => Promise.reject(error));
