/**
 * Search tag search accessor directive
 * @packageDocumentation
 */

import { Directive, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SearchTagSearchComponent } from './search-tag-search/search-tag-search.component';

/**
 * Search tag search accessor directive
 *
 * This directive adds support for Reactive forms to the search tag search
 * component.
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'app-search-tag-search[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchTagSearchAccessorDirective),
      multi: true,
    },
  ],
})
export class SearchTagSearchAccessorDirective
  implements ControlValueAccessor, OnInit, OnDestroy
{
  /**
   * Holds a reference to the function that gets called when the list of
   * selected diary entry search tags is changed.
   */
  private onChange!: (_: string[]) => void;

  /**
   * Holds a reference to the function that gets called when the list of
   * selected diary entry search tags is "touched" for the first time.
   */
  private onTouched!: () => void;

  /**
   * Holds a reference to the subscription to the list of selected diary entry
   * search tags.
   */
  private onSearchTags = Subscription.EMPTY;

  /**
   * If equals true, the list of selected diary entry search tags was changed.
   */
  private touched = false;

  /**
   * Construct the search tag search accessor directive
   *
   * @param component
   *   The component that handles the selection and deselection of diary entry
   *   search tags.
   */
  constructor(private component: SearchTagSearchComponent) {}

  /**
   * On initialization subscribe to the list of selected diary entry search
   * tags.
   */
  ngOnInit(): void {
    this.onSearchTags = this.component.searchTags$.subscribe((searchTags) => {
      this.onChange(searchTags);
      this.markAsTouched();
    });
  }

  /**
   * On destruction, unsubscribe from the list of selected diary entry search
   * tags.
   */
  ngOnDestroy(): void {
    this.onSearchTags.unsubscribe();
  }

  /**
   * Pass the given list of selected diary entry search tags to the search tag
   * search component.
   *
   * @param searchTags
   *   List of selected diary entry search tags
   */
  writeValue(searchTags: string[]): void {
    this.component.searchTags = searchTags;
  }

  /**
   * Register the given on-change function.
   *
   * @param onChange
   *   On-change function
   */
  registerOnChange(onChange: (searchTags: string[]) => void): void {
    this.onChange = onChange;
  }

  /**
   * Register the given on-touched function.
   *
   * @param onTouched
   *   On-touched function
   */
  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  /**
   * This method gets called the first time the list of selected diary entry
   * search tags is changed.
   */
  private markAsTouched(): void {
    if (this.touched) {
      return;
    }

    this.touched = true;
    this.onTouched();
  }
}
