import { DateRange } from './date-range.model';
import { NgbDateRange } from './ngb-date-range.model';

export function isEmpty(dateRange: DateRange): boolean {
  return dateRange.dateMin === '' && dateRange.dateMax === '';
}

export function isOpen(dateRange: NgbDateRange): boolean {
  const { dateMin, dateMax } = dateRange;
  return dateMin !== null && dateMax === null;
}

export function isRange(dateRange: NgbDateRange): boolean {
  const { dateMin, dateMax } = dateRange;
  return dateMin?.before(dateMax) || dateMin?.equals(dateMax) || false;
}
