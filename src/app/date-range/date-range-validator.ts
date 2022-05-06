/**
 * Date range validator
 * @packageDocumentation
 */

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { isRange } from './date-range-utils';
import { DateRange } from './date-range.model';
import { DateRangeService } from './date-range.service';

/**
 * Date range validator
 *
 * This class validates date ranges. A date range is valid if it is
 * either `null` or if its start date is before or equal to its end date.
 */
export class DateRangeValidator {
  /**
   * Initialize a new instance.
   *
   * @param dateRangeService
   *   Service for parsing date ranges
   */
  constructor(private readonly dateRangeService: DateRangeService) {}

  /**
   * Apply the date range validation to the given form control.
   *
   * @param control
   *   The form control
   *
   * @returns
   *   If `null`, the date range validation has passed; otherwise, an invalid
   *   date range error is returned.
   */
  isValid(control: AbstractControl): ValidationErrors | null {
    return this.isNullOrRange(control.value)
      ? null
      : { invalidDateRange: true };
  }

  /**
   * Check if the given date range is `null` or valid.
   *
   * @param dateRange
   *   The date range
   *
   * @returns
   *   If `true`, the given date range is either `null` or valid.
   */
  private isNullOrRange(dateRange: DateRange | null): boolean {
    return dateRange === null || this.isRange(dateRange);
  }

  /**
   * Check if the given date range is valid.
   *
   * @param dateRange
   *   The date range
   *
   * @returns
   *   If `true`, the given date range is valid.
   */
  private isRange(dateRange: DateRange): boolean {
    return isRange(this.dateRangeService.parseDateRange(dateRange));
  }

  /**
   * Date range validation function
   *
   * @param dateRangeService
   *   Service for parsing date ranges
   *
   * @returns
   *   Date range validation function
   */
  static isValid(dateRangeService: DateRangeService): ValidatorFn {
    const validator = new this(dateRangeService);
    return (control) => validator.isValid(control);
  }
}
