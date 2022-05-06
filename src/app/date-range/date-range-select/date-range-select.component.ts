/**
 * Date range select component
 * @packageDocumentation
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

import { isOpen } from '../date-range-utils';
import { DateRange } from '../date-range.model';
import { DateRangeService } from '../date-range.service';
import { NgbDateRange } from '../ngb-date-range.model';

/**
 * Date range select component
 *
 * This component renders the icon button for opening and closing the dropdown
 * that shows the calendar for selecting a diary entry's date. It also renders
 * the dropdown itself.
 */
@Component({
  selector: 'app-date-range-select',
  templateUrl: './date-range-select.component.html',
  styleUrls: ['./date-range-select.component.scss'],
})
export class DateRangeSelectComponent {
  /**
   * Holds a reference to the button's icon.
   */
  calendarIcon = faCalendar;

  /**
   * Holds a reference to the current parsed date range.
   */
  dateRangeParsed: NgbDateRange = {
    dateMin: null,
    dateMax: null,
  };

  /**
   * Holds a reference to the current date range.
   */
  private _dateRange: DateRange = {
    dateMin: '',
    dateMax: '',
  };

  /**
   * Access the reference to the current date range.
   */
  get dateRange(): DateRange {
    return this._dateRange;
  }

  /**
   * Set the reference to the current date range and update its parsed value.
   */
  @Input()
  set dateRange(value: DateRange) {
    this.dateRangeParsed = this.dateRangeService.parseDateRange(value);
    this._dateRange = value;
  }

  /**
   * Apply the given class to the icon button.
   */
  @Input()
  buttonClass = '';

  /**
   * Emits whenever a date range is selected.
   */
  @Output()
  dateRangeSelect = new EventEmitter<DateRange>();

  /**
   * Initialize a new instance.
   *
   * @param dateRangeService
   *   Service for parsing and formatting dates and date ranges
   * @param calendar
   *   Service for retrieving the date of today
   */
  constructor(
    private readonly dateRangeService: DateRangeService,
    private readonly calendar: NgbCalendar
  ) {}

  /**
   * Updates the date range if the user has clicked on a date and this date
   * range is emitted.
   *
   * @param date
   *   The date the user has clicked on
   */
  onDateSelect(date: NgbDate): void {
    this.dateRangeSelect.emit(this.getDateRange(date));
  }

  /**
   * Specifies the month the calendar should show when it is opened.
   */
  get startDate(): NgbDate {
    return this.dateRangeParsed.dateMin ?? this.calendar.getToday();
  }

  /**
   * Creates a new date range using `dateRangeParsed` and the given date.
   *
   * If the current date range is open and if the given date is equal to or
   * after the date range's start date, it is used as the date range's end date.
   * Otherwise, the date range is reset and the given date is used as its new
   * start date.
   *
   * @param date
   *   The date
   *
   * @returns
   *   The updated date range
   */
  private getDateRange(date: NgbDate): DateRange {
    const dateString = this.dateRangeService.formatDate(date);

    return this.isOpenAndValidDateMax(date)
      ? { dateMin: this.dateRange.dateMin, dateMax: dateString }
      : { dateMin: dateString, dateMax: '' };
  }

  /**
   * Checks if the current date range is open and if the given date is a valid
   * end date.
   *
   * @param date
   *   The date
   *
   * @returns
   *   If `true` the date range is open and the given date is a valid end date.
   */
  private isOpenAndValidDateMax(date: NgbDate): boolean {
    return isOpen(this.dateRangeParsed) && this.isValidDateMax(date);
  }

  /**
   * Checks if he given date is a valid end date.
   *
   * @param date
   *   The date
   *
   * @returns
   *   If `true` the given date is a valid end date.
   */
  private isValidDateMax(date: NgbDate): boolean {
    const { dateMin } = this.dateRangeParsed;
    return date.equals(dateMin) || date.after(dateMin);
  }
}
