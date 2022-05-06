/**
 * Date range utility functions
 * @packageDocumentation
 */

import { DateRange } from './date-range.model';
import { NgbDateRange } from './ngb-date-range.model';

/**
 * Check if the given date range is empty.
 *
 * A date range is empty if neither start nor end date are specified; meaning,
 * they are both empty strings.
 *
 * @param dateRange
 *   The date range
 *
 * @returns
 *   If `true`, the given date range is empty.
 */
export function isEmpty(dateRange: DateRange): boolean {
  return dateRange.dateMin === '' && dateRange.dateMax === '';
}

/**
 * Check if the given parsed date range is open.
 *
 * A date range is open if only its start date is specified.
 *
 * @param dateRange
 *   The date range
 *
 * @returns
 *   If `true`, the given parsed date range is open.
 */
export function isOpen(dateRange: NgbDateRange): boolean {
  const { dateMin, dateMax } = dateRange;
  return dateMin !== null && dateMax === null;
}

/**
 * Check if the given parsed date range is valid.
 *
 * A date range is valid if its start date is before or equal to its end date.
 *
 * @param dateRange
 *   The date range
 *
 * @returns
 *   If `true`, the given parsed date range is valid.
 */
export function isRange(dateRange: NgbDateRange): boolean {
  const { dateMin, dateMax } = dateRange;
  return dateMin?.before(dateMax) || dateMin?.equals(dateMax) || false;
}
