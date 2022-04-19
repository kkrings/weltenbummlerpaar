import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DateRange } from '../date-range/date-range.model';

@Component({
  selector: 'app-date-range-select',
})
export class MockDateRangeSelectComponent {
  @Input()
  dateRange: DateRange = {
    dateMin: '',
    dateMax: '',
  };

  @Output()
  dateRangeSelect = new EventEmitter<DateRange>();
}
