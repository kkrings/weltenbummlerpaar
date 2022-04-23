import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

import { isOpen } from '../date-range-utils';
import { DateRange } from '../date-range.model';
import { DateRangeService } from '../date-range.service';
import { NgbDateRange } from '../ngb-date-range.model';

@Component({
  selector: 'app-date-range-select',
  templateUrl: './date-range-select.component.html',
  styleUrls: ['./date-range-select.component.scss'],
})
export class DateRangeSelectComponent {
  calendarIcon = faCalendar;

  dateRangeParsed: NgbDateRange = {
    dateMin: null,
    dateMax: null,
  };

  private _dateRange: DateRange = {
    dateMin: '',
    dateMax: '',
  };

  get dateRange(): DateRange {
    return this._dateRange;
  }

  @Input()
  set dateRange(value: DateRange) {
    this.dateRangeParsed = this.dateRangeService.parseDateRange(value);
    this._dateRange = value;
  }

  @Input()
  buttonClass = '';

  @Output()
  dateRangeSelect = new EventEmitter<DateRange>();

  constructor(
    private readonly dateRangeService: DateRangeService,
    private readonly calendar: NgbCalendar
  ) {}

  onDateSelect(date: NgbDate): void {
    this.dateRangeSelect.emit(this.getDateRange(date));
  }

  get startDate(): NgbDate {
    return this.dateRangeParsed.dateMin ?? this.calendar.getToday();
  }

  private getDateRange(date: NgbDate): DateRange {
    const dateString = this.dateRangeService.formatDate(date);

    return this.isOpenAndValidDateMax(date)
      ? { dateMin: this.dateRange.dateMin, dateMax: dateString }
      : { dateMin: dateString, dateMax: '' };
  }

  private isOpenAndValidDateMax(date: NgbDate): boolean {
    return isOpen(this.dateRangeParsed) && this.isValidDateMax(date);
  }

  private isValidDateMax(date: NgbDate): boolean {
    const { dateMin } = this.dateRangeParsed;
    return date.equals(dateMin) || date.after(dateMin);
  }
}
