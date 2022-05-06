/**
 * Date range select day component
 * @packageDocumentation
 */

import { Component, Input } from '@angular/core';
import { NgbDate, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

import { isOpen, isRange } from '../date-range-utils';
import { NgbDateRange } from '../ngb-date-range.model';

/**
 * Date range select day component
 *
 * This component makes sure that the date range, which is selected by the user,
 * is properly highlighted in the calendar. It is used within the calendar's
 * template for rendering days.
 */
@Component({
  selector: 'app-date-range-select-day',
  templateUrl: './date-range-select-day.component.html',
  styleUrls: ['./date-range-select-day.component.scss'],
})
export class DateRangeSelectDayComponent {
  /**
   * Holds a reference to the current date range.
   */
  @Input()
  dateRange: NgbDateRange = {
    dateMin: null,
    dateMax: null,
  };

  /**
   * Holds a reference to the date that this component is rendering.
   */
  @Input()
  date = new NgbDate(2020, 2, 14);

  /**
   * Initialize a new instance.
   *
   * @param i18n
   *   Service for extracting and formatting the `date`'s day part.
   */
  constructor(private readonly i18n: NgbDatepickerI18n) {}

  /**
   * Specifies if the `date` is equal to the date range's start date.
   */
  get dateIsDateMin(): boolean {
    return (
      (isOpen(this.dateRange) || isRange(this.dateRange)) &&
      this.date.equals(this.dateRange.dateMin)
    );
  }

  /**
   * Specifies if the `date` is equal to the date range's end date.
   */
  get dateIsDateMax(): boolean {
    return isRange(this.dateRange) && this.date.equals(this.dateRange.dateMax);
  }

  /**
   * Specifies if the `date` is in between the date range's start and end dates.
   */
  get dateIsInRange(): boolean {
    return (
      isRange(this.dateRange) &&
      this.date.after(this.dateRange.dateMin) &&
      this.date.before(this.dateRange.dateMax)
    );
  }

  /**
   * Extract and format the day part from the given date.
   *
   * @param date
   *   The date
   *
   * @returns
   *   The formatted day part
   */
  getDay(date: NgbDate): string {
    return this.i18n.getDayNumerals(date);
  }
}
