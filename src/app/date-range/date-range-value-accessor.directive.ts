import { Directive, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DateRangeInputComponent } from './date-range-input/date-range-input.component';
import { isEmpty } from './date-range-utils';
import { DateRange } from './date-range.model';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'app-date-range-input[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeValueAccessorDirective),
      multi: true,
    },
  ],
})
export class DateRangeValueAccessorDirective
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private valueChangesHandler = Subscription.EMPTY;
  private touchedHandler = Subscription.EMPTY;
  private onChange = (_dateRange: DateRange | null) => {};
  private onTouched = () => {};

  constructor(private readonly component: DateRangeInputComponent) {}

  registerOnChange(onChange: (dateRange: DateRange | null) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  ngOnInit(): void {
    this.valueChangesHandler = this.subscribeToValueChanges();
    this.touchedHandler = this.subscribeToTouched();
  }

  ngOnDestroy(): void {
    this.valueChangesHandler.unsubscribe();
    this.touchedHandler.unsubscribe();
  }

  writeValue(dateRange: DateRange | null): void {
    this.component.onDateRangeSelect(dateRange);
  }

  private subscribeToValueChanges(): Subscription {
    return this.component.dateRangeForm.valueChanges.subscribe(
      (dateRange: DateRange) => this.handleValueChanges(dateRange)
    );
  }

  private handleValueChanges(dateRange: DateRange): void {
    this.onChange(isEmpty(dateRange) ? null : dateRange);
  }

  private subscribeToTouched(): Subscription {
    return this.component.touched.subscribe((touched) =>
      this.handleTouched(touched)
    );
  }

  private handleTouched(touched: boolean): void {
    if (touched) {
      this.onTouched();
    }
  }
}
