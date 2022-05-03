/**
 * Date range pipe
 * @packageDocumentation
 */

import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

import { DateRange } from './date-range.model';

/**
 * Date range pipe
 *
 * This pipe transforms a diary entry's date range into a user friendly string,
 * by taking into account if the time period either covers a single or multiple
 * days.
 */
@Pipe({
  name: 'dateRange',
})
export class DateRangePipe implements PipeTransform {
  /**
   * Initialize a new date range pipe instance.
   *
   * @param locale
   *   The date range's `dateMin` and `dateMax` are transformed according to the
   *   application's locale.
   */
  constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

  /**
   * Transform the given date range.
   *
   * @param dateRange
   *   The date range
   *
   * @returns
   *   The transformed date range
   */
  transform(dateRange: DateRange): string {
    const dateMin = this.format(dateRange.dateMin);
    const dateMax = this.format(dateRange.dateMax);

    return dateRange.dateMin !== dateRange.dateMax
      ? `${dateMin} bis ${dateMax}`
      : dateMin;
  }

  /**
   * Format the given date, by taking into account the application's locale.
   *
   * @param date
   *   The date
   *
   * @returns
   *   The formatted date
   */
  private format(date: string): string {
    return formatDate(date, 'mediumDate', this.locale);
  }
}
