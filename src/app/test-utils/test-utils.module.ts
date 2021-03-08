/**
 * Test utilities module
 * @packageDocumentation
 */

import { Component, Directive, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, defer } from 'rxjs';

import { AlertType } from '../http-alert/alert.model';


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
 * Mock HTTP alert message component
 */
@Component({
  selector: 'app-http-alert-message',
  template: ''
})
export class MockHttpAlertMessageComponent {
  /**
   * Mock input HTTP alert type
   */
  @Input() alertType = AlertType.none;
}

/**
 * Test utilities module
 *
 * This module provides mock implementations of components, directives,
 * services, and so on that are used in more than one unit test file.
 */
@NgModule({
  declarations: [
    MockImageDirective,
    MockHttpAlertMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MockImageDirective,
    MockHttpAlertMessageComponent
  ]
})
export class TestUtilsModule { }
