import { Injectable } from '@angular/core';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { DateRange } from './date-range.model';
import { NgbDateRange } from './ngb-date-range.model';

@Injectable({
  providedIn: 'root',
})
export class DateRangeService {
  constructor(private readonly dateParserFormatter: NgbDateParserFormatter) {}

  parseDate(date: string): NgbDate | null {
    return NgbDate.from(this.dateParserFormatter.parse(date));
  }

  parseDateRange(dateRange: DateRange): NgbDateRange {
    return {
      dateMin: this.parseDate(dateRange.dateMin),
      dateMax: this.parseDate(dateRange.dateMax),
    };
  }

  formatDate(date: NgbDate | null): string {
    return this.dateParserFormatter.format(date);
  }

  formatDateRange(dateRange: NgbDateRange): DateRange {
    return {
      dateMin: this.formatDate(dateRange.dateMin),
      dateMax: this.formatDate(dateRange.dateMax),
    };
  }
}
