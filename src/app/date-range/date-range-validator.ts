import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { isRange } from './date-range-utils';
import { DateRange } from './date-range.model';
import { DateRangeService } from './date-range.service';

export class DateRangeValidator {
  constructor(private readonly dateRangeService: DateRangeService) {}

  isValid(control: AbstractControl): ValidationErrors | null {
    return this.isNullOrRange(control.value)
      ? null
      : { invalidDateRange: true };
  }

  private isNullOrRange(dateRange: DateRange | null): boolean {
    return dateRange === null || this.isRange(dateRange);
  }

  private isRange(dateRange: DateRange): boolean {
    return isRange(this.dateRangeService.parseDateRange(dateRange));
  }

  static isValid(dateRangeService: DateRangeService): ValidatorFn {
    const validator = new this(dateRangeService);
    return (control) => validator.isValid(control);
  }
}
