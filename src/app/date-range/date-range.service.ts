/**
 * Date range service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { DateRange } from './date-range.model';
import { NgbDateRange } from './ngb-date-range.model';

/**
 * Date range service
 *
 * This service is used to transform between the `DateRange` and
 * the `NgbDateRange` models, respectively.
 */
@Injectable({
  providedIn: 'root',
})
export class DateRangeService {
  /**
   * Initialize a new date range service instance.
   *
   * @param dateParserFormatter
   *   Service for formatting and parsing dates, respectively
   */
  constructor(private readonly dateParserFormatter: NgbDateParserFormatter) {}

  /**
   * Parse the given string-formatted date.
   *
   * @param date
   *   The string-formatted date
   *
   * @returns
   *   The parsed date; `null` is returned if the date string is either empty or
   *   invalid.
   */
  parseDate(date: string): NgbDate | null {
    return NgbDate.from(this.dateParserFormatter.parse(date));
  }

  /**
   * Parse the given date range.
   *
   * @param dateRange
   *   The date range
   *
   * @returns
   *   The parsed date range
   */
  parseDateRange(dateRange: DateRange): NgbDateRange {
    return {
      dateMin: this.parseDate(dateRange.dateMin),
      dateMax: this.parseDate(dateRange.dateMax),
    };
  }

  /**
   * Format the given date.
   *
   * @param date
   *   The date
   *
   * @returns
   *   The string-formatted date
   */
  formatDate(date: NgbDate | null): string {
    return this.dateParserFormatter.format(date);
  }

  /**
   * Format the given date range.
   *
   * @param dateRange
   *   The given date range
   *
   * @returns
   *   The string-formatted date range
   */
  formatDateRange(dateRange: NgbDateRange): DateRange {
    return {
      dateMin: this.formatDate(dateRange.dateMin),
      dateMax: this.formatDate(dateRange.dateMax),
    };
  }
}
