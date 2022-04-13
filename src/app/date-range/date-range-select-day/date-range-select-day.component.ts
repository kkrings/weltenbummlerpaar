import { Component, Input } from '@angular/core';
import { NgbDate, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

import { isOpen, isRange } from '../date-range-utils';
import { NgbDateRange } from '../ngb-date-range.model';

@Component({
  selector: 'app-date-range-select-day',
  templateUrl: './date-range-select-day.component.html',
  styleUrls: ['./date-range-select-day.component.scss'],
})
export class DateRangeSelectDayComponent {
  @Input()
  dateRange: NgbDateRange = {
    dateMin: null,
    dateMax: null,
  };

  @Input()
  date!: NgbDate;

  constructor(private readonly i18n: NgbDatepickerI18n) {}

  get dateIsDateMin(): boolean {
    return (
      (isOpen(this.dateRange) || isRange(this.dateRange)) &&
      this.date.equals(this.dateRange.dateMin)
    );
  }

  get dateIsDateMax(): boolean {
    return isRange(this.dateRange) && this.date.equals(this.dateRange.dateMax);
  }

  get dateIsInRange(): boolean {
    return (
      isRange(this.dateRange) &&
      this.date.after(this.dateRange.dateMin) &&
      this.date.before(this.dateRange.dateMax)
    );
  }

  getDay(date: NgbDate): string {
    return this.i18n.getDayNumerals(date);
  }
}
