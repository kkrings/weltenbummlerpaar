import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

import { DateRange } from './date-range.model';

@Pipe({
  name: 'dateRange',
})
export class DateRangePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

  transform(dateRange: DateRange): string {
    const dateMin = this.format(dateRange.dateMin);
    const dateMax = this.format(dateRange.dateMax);

    return dateRange.dateMin !== dateRange.dateMax
      ? `${dateMin} bis ${dateMax}`
      : dateMin;
  }

  private format(date: string): string {
    return formatDate(date, 'mediumDate', this.locale);
  }
}
