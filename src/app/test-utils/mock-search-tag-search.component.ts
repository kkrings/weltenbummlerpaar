/**
 * Mock search tag search component
 * @packageDocumentation
 */

import { Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Mock search tag search component
 */
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
