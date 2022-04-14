import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbDate, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { DateRangeService } from '../date-range.service';
import { NgbDateRange } from '../ngb-date-range.model';
import { DateRangeSelectComponent } from './date-range-select.component';

@Component({
  selector: 'app-date-range-select-day',
})
class MockDateRangeSelectDayComponent {
  @Input()
  dateRange: NgbDateRange = {
    dateMin: null,
    dateMax: null,
  };

  @Input()
  date = new NgbDate(2020, 2, 14);
}

describe('DateRangeSelectionComponent', () => {
  let component: DateRangeSelectComponent;
  let fixture: ComponentFixture<DateRangeSelectComponent>;

  beforeEach(async () => {
    const dateRangeServiceSpy = jasmine.createSpyObj('DateRangeService', [
      'formatDate',
      'parseDateRange',
    ]);

    await TestBed.configureTestingModule({
      imports: [NgbDatepickerModule],
      declarations: [DateRangeSelectComponent, MockDateRangeSelectDayComponent],
      providers: [
        {
          provide: DateRangeService,
          useValue: dateRangeServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
