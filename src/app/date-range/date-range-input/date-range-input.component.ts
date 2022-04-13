import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

import { DateRange } from '../date-range.model';

@Component({
  selector: 'app-date-range-input',
  templateUrl: './date-range-input.component.html',
  styleUrls: ['./date-range-input.component.scss'],
})
export class DateRangeInputComponent {
  dateRangeForm: FormGroup;
  calendarIcon = faCalendar;

  @Output()
  touched = new EventEmitter<boolean>();

  constructor(formBuilder: FormBuilder) {
    this.dateRangeForm = formBuilder.group({
      dateMin: [''],
      dateMax: [''],
    });
  }

  onDateRangeSelect(dateRange: DateRange | null): void {
    this.dateRangeForm.setValue({
      dateMin: dateRange?.dateMin ?? '',
      dateMax: dateRange?.dateMax ?? '',
    });
  }

  onBlur(): void {
    this.touched.emit(this.dateRangeForm.touched);
  }
}
