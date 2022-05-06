/**
 * Date range input component
 * @packageDocumentation
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DateRange } from '../date-range.model';

/**
 * Date range input component
 *
 * This component renders the form control for selecting a diary entry's date
 * range.
 */
@Component({
  selector: 'app-date-range-input',
  templateUrl: './date-range-input.component.html',
  styleUrls: ['./date-range-input.component.scss'],
})
export class DateRangeInputComponent {
  /**
   * Holds a reference to the form for setting the date range's start and end
   * dates.
   */
  dateRangeForm: FormGroup;

  /**
   * Emits whenever the form controls for the date range's start or end dates
   * are touched.
   */
  @Output()
  touched = new EventEmitter<boolean>();

  /**
   * Initialize a new instance.
   *
   * @param formBuilder
   *   Service for creating the form for setting the date range's start and end
   *   dates
   */
  constructor(formBuilder: FormBuilder) {
    this.dateRangeForm = formBuilder.group({
      dateMin: [''],
      dateMax: [''],
    });
  }

  /**
   * Handle date ranges that were selected using the calendar.
   *
   * @param dateRange
   *   The selected date range
   */
  onDateRangeSelect(dateRange: DateRange | null): void {
    this.dateRangeForm.setValue({
      dateMin: dateRange?.dateMin ?? '',
      dateMax: dateRange?.dateMax ?? '',
    });
  }

  /**
   * The date range form control is touched whenever the form control for the
   * start or the end date emit a 'blur' event.
   */
  onBlur(): void {
    this.touched.emit(this.dateRangeForm.touched);
  }
}
