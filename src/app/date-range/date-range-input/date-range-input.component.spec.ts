import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { DateRange } from '../date-range.model';
import { DateRangeInputComponent } from './date-range-input.component';

@Component({
  selector: 'app-date-range-select',
})
class MockDateRangeSelectComponent {
  @Input()
  dateRange: DateRange = {
    dateMin: '',
    dateMax: '',
  };

  @Output()
  dateRangeSelect = new EventEmitter<DateRange>();
}

describe('DiaryEntryDatePickerComponent', () => {
  let component: DateRangeInputComponent;
  let fixture: ComponentFixture<DateRangeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DateRangeInputComponent, MockDateRangeSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
