import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { isEmpty } from '../date-range-utils';
import { DateRange } from '../date-range.model';

@Component({
  selector: 'app-date-range-input[formControlName]',
  templateUrl: './date-range-input.component.html',
  styleUrls: ['./date-range-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeInputComponent),
      multi: true,
    },
  ],
})
export class DateRangeInputComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  readonly dateRangeForm: FormGroup;
  readonly calendarIcon = faCalendar;

  private valueChangesHandler = Subscription.EMPTY;
  private onChange = (_dateRange: DateRange | null) => {};
  private onTouched = () => {};

  constructor(formBuilder: FormBuilder) {
    this.dateRangeForm = formBuilder.group({
      dateMin: [''],
      dateMax: [''],
    });
  }

  registerOnChange(onChange: (dateRange: DateRange | null) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  ngOnInit(): void {
    this.valueChangesHandler = this.dateRangeForm.valueChanges.subscribe(
      (dateRange: DateRange) => this.handleChange(dateRange)
    );
  }

  ngOnDestroy(): void {
    this.valueChangesHandler.unsubscribe();
  }

  writeValue(dateRange: DateRange | null): void {
    this.dateRangeForm.setValue({
      dateMin: dateRange?.dateMin ?? '',
      dateMax: dateRange?.dateMax ?? '',
    });
  }

  onBlur(): void {
    this.onTouched();
  }

  private handleChange(dateRange: DateRange): void {
    this.onChange(isEmpty(dateRange) ? null : dateRange);
  }
}
