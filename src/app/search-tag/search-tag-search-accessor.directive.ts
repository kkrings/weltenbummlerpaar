import { Directive, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SearchTagSearchComponent } from './search-tag-search/search-tag-search.component';

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
  private onChange!: (_: string[]) => void;
  private onTouched!: () => void;
  private onSearchTags = Subscription.EMPTY;
  private touched = false;

  constructor(private component: SearchTagSearchComponent) {}

  ngOnInit(): void {
    this.onSearchTags = this.component.searchTags$.subscribe((searchTags) => {
      this.onChange(searchTags);
      this.markAsTouched();
    });
  }

  ngOnDestroy(): void {
    this.onSearchTags.unsubscribe();
  }

  writeValue(searchTags: string[]): void {
    this.component.searchTags = searchTags;
  }

  registerOnChange(onChange: (searchTags: string[]) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  private markAsTouched(): void {
    if (this.touched) {
      return;
    }

    this.touched = true;
    this.onTouched();
  }
}
