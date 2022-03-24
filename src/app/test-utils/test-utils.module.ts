/**
 * Test utilities module
 * @packageDocumentation
 */

import { Component, Directive, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, defer, Subject } from 'rxjs';

import { AlertType } from '../http-alert/alert.model';
import { Image } from '../image/image.model';
import { SearchTagSearchAccessorDirective } from '../search-tag/search-tag-search-accessor.directive';
import { SearchTagSearchComponent } from '../search-tag/search-tag-search/search-tag-search.component';

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
 * Mock active modal
 */
export class MockNgbActiveModal {
  /**
   * Mock the active modal's close method.
   */
  close(): void {}
}

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

/**
 * Mock HTTP alert message component
 */
@Component({
  selector: 'app-http-alert-message',
  template: '',
})
export class MockHttpAlertMessageComponent {
  /**
   * Mock input HTTP alert type
   */
  @Input() alertType = AlertType.none;
}

@Component({
  selector: 'app-search-tag-search',
})
export class MockSearchTagSearchComponent {
  /**
   * Mock allow to set new search tags
   */
  @Input() allowNewSearchTags = false;

  /**
   * Mock list of selected search tags
   */
  searchTags: string[] = [];

  /**
   * Mock stream of selected search tags
   */
  searchTags$: Observable<string[]>;

  /**
   * Stream's source
   */
  searchTagsSource = new Subject<string[]>();

  /**
   * Construct a new instance of this component.
   */
  constructor() {
    this.searchTags$ = this.searchTagsSource.asObservable();
  }
}

/**
 * Test utilities module
 *
 * This module provides mock implementations of components, directives,
 * services, and so on that are used in more than one unit test file.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [
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
    MockImageDirective,
    MockImageWithLoaderComponent,
    MockHttpAlertMessageComponent,
    MockSearchTagSearchComponent,
    SearchTagSearchAccessorDirective,
  ],
})
export class TestUtilsModule {}
