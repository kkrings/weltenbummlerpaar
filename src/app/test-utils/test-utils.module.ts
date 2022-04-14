/**
 * Test utilities module
 * @packageDocumentation
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, defer } from 'rxjs';

import { SearchTagSearchAccessorDirective } from '../search-tag/search-tag-search-accessor.directive';
import { SearchTagSearchComponent } from '../search-tag/search-tag-search/search-tag-search.component';
import { MockDateRangeSelectComponent } from './mock-date-range-select.component';
import { MockHttpAlertMessageComponent } from './mock-http-alert-message.component';
import { MockImageWithLoaderComponent } from './mock-image-with-loader.component';
import { MockImageDirective } from './mock-image.directive';
import { MockSearchTagSearchComponent } from './mock-search-tag-search.component';

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
export const asyncData = <T>(data: T): Observable<T> =>
  defer(() => Promise.resolve(data));

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
export const asyncError = <T>(error: T): Observable<never> =>
  defer(() => Promise.reject(error));

/**
 * Test utilities module
 *
 * This module provides mock implementations of components, directives,
 * services, and so on that are used in more than one unit test file.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [
    MockDateRangeSelectComponent,
    MockImageDirective,
    MockImageWithLoaderComponent,
    MockHttpAlertMessageComponent,
    MockSearchTagSearchComponent,
    SearchTagSearchAccessorDirective,
  ],
  providers: [
    {
      provide: SearchTagSearchComponent,
      useClass: MockSearchTagSearchComponent,
    },
  ],
  exports: [
    MockDateRangeSelectComponent,
    MockImageDirective,
    MockImageWithLoaderComponent,
    MockHttpAlertMessageComponent,
    MockSearchTagSearchComponent,
    SearchTagSearchAccessorDirective,
  ],
})
export class TestUtilsModule {}
