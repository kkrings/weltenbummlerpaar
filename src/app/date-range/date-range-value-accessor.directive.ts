/**
 * Date range value accessor directive
 * @packageDocumentation
 */

import { Directive, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DateRangeInputComponent } from './date-range-input/date-range-input.component';
import { isEmpty } from './date-range-utils';
import { DateRange } from './date-range.model';

/**
 * Date range value accessor directive
 *
 * This directive makes it possible to use the date range component inside of a
 * Reactive form.
 */
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
  /**
   * Subscription to the observable that emits the current date range whenever
   * it has changed
   */
  private valueChangesHandler = Subscription.EMPTY;

  /**
   * Subscription to the observable that emits whenever the date range component
   * is touched.
   */
  private touchedHandler = Subscription.EMPTY;

  /**
   * Gets executed whenever the date range changes.
   */
  private onChange = (_dateRange: DateRange | null) => {};

  /**
   * Gets executed whenever the date range component is touched.
   */
  private onTouched = () => {};

  /**
   * Initialize a new instance.
   *
   * @param component
   *   This component allows the user to select a date range.
   */
  constructor(private readonly component: DateRangeInputComponent) {}

  /**
   * Register the callback function that gets called whenever the date range
   * changes.
   *
   * @param onChange
   *   The callback function
   */
  registerOnChange(onChange: (dateRange: DateRange | null) => void): void {
    this.onChange = onChange;
  }

  /**
   * Register the callback function that gets called whenever the date range
   * component is touched.
   *
   * @param onTouched
   *   The callback function
   */
  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  /**
   * On initialization, subscribe to the observables that emit whenever the date
   * range has changed or the date range component is touched, respectively.
   */
  ngOnInit(): void {
    this.valueChangesHandler = this.subscribeToValueChanges();
    this.touchedHandler = this.subscribeToTouched();
  }

  /**
   * On deconstruction, unsubscribe from the observables that emit whenever the
   * date range has changed or the date range component is touched,
   * respectively.
   */
  ngOnDestroy(): void {
    this.valueChangesHandler.unsubscribe();
    this.touchedHandler.unsubscribe();
  }

  /**
   * Write the given date range to the date range component.
   *
   * @param dateRange
   *   The date range
   */
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
