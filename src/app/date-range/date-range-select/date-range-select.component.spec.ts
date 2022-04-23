import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NgbCalendar,
  NgbDate,
  NgbDatepicker,
  NgbDatepickerModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { DateRange } from '../date-range.model';
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
      imports: [NgbDatepickerModule, NgbDropdownModule, FontAwesomeModule],
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

  describe('#dateRange', () => {
    const dateRange: DateRange = {
      dateMin: '2020-02-14',
      dateMax: '',
    };

    const dateRangeParsed: NgbDateRange = {
      dateMin: new NgbDate(2020, 2, 14),
      dateMax: null,
    };

    let dateRangeServiceSpy: jasmine.SpyObj<DateRangeService>;

    beforeEach(() => {
      dateRangeServiceSpy = TestBed.inject(
        DateRangeService
      ) as jasmine.SpyObj<DateRangeService>;
    });

    beforeEach(() => {
      dateRangeServiceSpy.parseDateRange.and.returnValue(dateRangeParsed);
    });

    beforeEach(() => {
      component.dateRange = dateRange;
    });

    it('#dateRangeParsed should have been set', () => {
      expect(component.dateRangeParsed).toEqual(dateRangeParsed);
    });

    afterEach(() => {
      expect(dateRangeServiceSpy.parseDateRange).toHaveBeenCalledWith(
        dateRange
      );
    });
  });

  describe('#buttonClass', () => {
    const buttonClass = 'input-group-text';

    beforeEach(() => {
      component.buttonClass = buttonClass;
      fixture.detectChanges();
    });

    it('should have been applied to toggle calendar button', () => {
      const button = fixture.debugElement.query(By.css('#toggle-calendar'));
      expect(button.classes[buttonClass]).toBeTrue();
    });
  });

  describe('#onDateSelect', () => {
    const selectedDate = new NgbDate(2020, 2, 14);
    const selectedDateString = '2020-02-14';

    let dateRangeServiceSpy: jasmine.SpyObj<DateRangeService>;

    beforeEach(() => {
      dateRangeServiceSpy = TestBed.inject(
        DateRangeService
      ) as jasmine.SpyObj<DateRangeService>;
    });

    beforeEach(() => {
      dateRangeServiceSpy.formatDate.and.returnValue(selectedDateString);
    });

    describe('#dateRange empty or invalid', () => {
      const dateRange: DateRange = {
        dateMin: '',
        dateMax: '',
      };

      const dateRangeParsed: NgbDateRange = {
        dateMin: null,
        dateMax: null,
      };

      let dateSelectHandler: Subscription;
      let selectedDateRange: DateRange;

      beforeEach(() => {
        dateSelectHandler = Subscription.EMPTY;
      });

      beforeEach(() => {
        dateRangeServiceSpy.parseDateRange.and.returnValue(dateRangeParsed);
      });

      beforeEach(() => {
        component.dateRange = dateRange;
      });

      beforeEach((done) => {
        dateSelectHandler = component.dateRangeSelect.subscribe((dateRange) => {
          selectedDateRange = dateRange;
          done();
        });

        component.onDateSelect(selectedDate);
      });

      it('dateMin should have been set', () => {
        expect(selectedDateRange).toEqual({
          dateMin: selectedDateString,
          dateMax: '',
        });
      });

      afterEach(() => {
        dateSelectHandler.unsubscribe();
      });

      afterEach(() => {
        expect(dateRangeServiceSpy.parseDateRange).toHaveBeenCalledWith(
          dateRange
        );
      });
    });

    describe('#dateRange.dateMin before selected date', () => {
      const dateRange: DateRange = {
        dateMin: '2020-02-13',
        dateMax: '',
      };

      const dateRangeParsed: NgbDateRange = {
        dateMin: new NgbDate(2020, 2, 13),
        dateMax: null,
      };

      let dateSelectHandler: Subscription;
      let selectedDateRange: DateRange;

      beforeEach(() => {
        dateSelectHandler = Subscription.EMPTY;
      });

      beforeEach(() => {
        dateRangeServiceSpy.parseDateRange.and.returnValue(dateRangeParsed);
      });

      beforeEach(() => {
        component.dateRange = dateRange;
      });

      beforeEach((done) => {
        dateSelectHandler = component.dateRangeSelect.subscribe((dateRange) => {
          selectedDateRange = dateRange;
          done();
        });

        component.onDateSelect(selectedDate);
      });

      it('dateMax should have been set', () => {
        expect(selectedDateRange).toEqual({
          dateMin: dateRange.dateMin,
          dateMax: selectedDateString,
        });
      });

      afterEach(() => {
        dateSelectHandler.unsubscribe();
      });

      afterEach(() => {
        expect(dateRangeServiceSpy.parseDateRange).toHaveBeenCalledWith(
          dateRange
        );
      });
    });

    describe('#dateRange.dateMin equals selected date', () => {
      const dateRange: DateRange = {
        dateMin: selectedDateString,
        dateMax: '',
      };

      const dateRangeParsed: NgbDateRange = {
        dateMin: selectedDate,
        dateMax: null,
      };

      let dateSelectHandler: Subscription;
      let selectedDateRange: DateRange;

      beforeEach(() => {
        dateSelectHandler = Subscription.EMPTY;
      });

      beforeEach(() => {
        dateRangeServiceSpy.parseDateRange.and.returnValue(dateRangeParsed);
      });

      beforeEach(() => {
        component.dateRange = dateRange;
      });

      beforeEach((done) => {
        dateSelectHandler = component.dateRangeSelect.subscribe((dateRange) => {
          selectedDateRange = dateRange;
          done();
        });

        component.onDateSelect(selectedDate);
      });

      it('dateMax should have been set', () => {
        expect(selectedDateRange).toEqual({
          dateMin: dateRange.dateMin,
          dateMax: selectedDateString,
        });
      });

      afterEach(() => {
        dateSelectHandler.unsubscribe();
      });

      afterEach(() => {
        expect(dateRangeServiceSpy.parseDateRange).toHaveBeenCalledWith(
          dateRange
        );
      });
    });

    describe('#dateRange.dateMin after selected date', () => {
      const dateRange: DateRange = {
        dateMin: '2020-02-15',
        dateMax: '',
      };

      const dateRangeParsed: NgbDateRange = {
        dateMin: new NgbDate(2020, 2, 15),
        dateMax: null,
      };

      let dateSelectHandler: Subscription;
      let selectedDateRange: DateRange;

      beforeEach(() => {
        dateSelectHandler = Subscription.EMPTY;
      });

      beforeEach(() => {
        dateRangeServiceSpy.parseDateRange.and.returnValue(dateRangeParsed);
      });

      beforeEach(() => {
        component.dateRange = dateRange;
      });

      beforeEach((done) => {
        dateSelectHandler = component.dateRangeSelect.subscribe((dateRange) => {
          selectedDateRange = dateRange;
          done();
        });

        component.onDateSelect(selectedDate);
      });

      it('dateMin should have been set', () => {
        expect(selectedDateRange).toEqual({
          dateMin: selectedDateString,
          dateMax: '',
        });
      });

      afterEach(() => {
        dateSelectHandler.unsubscribe();
      });

      afterEach(() => {
        expect(dateRangeServiceSpy.parseDateRange).toHaveBeenCalledWith(
          dateRange
        );
      });
    });

    describe('#dateRange valid', () => {
      const dateRange: DateRange = {
        dateMin: '2020-02-15',
        dateMax: '2020-02-16',
      };

      const dateRangeParsed: NgbDateRange = {
        dateMin: new NgbDate(2020, 2, 15),
        dateMax: new NgbDate(2020, 2, 16),
      };

      let dateSelectHandler: Subscription;
      let selectedDateRange: DateRange;

      beforeEach(() => {
        dateSelectHandler = Subscription.EMPTY;
      });

      beforeEach(() => {
        dateRangeServiceSpy.parseDateRange.and.returnValue(dateRangeParsed);
      });

      beforeEach(() => {
        component.dateRange = dateRange;
      });

      beforeEach((done) => {
        dateSelectHandler = component.dateRangeSelect.subscribe((dateRange) => {
          selectedDateRange = dateRange;
          done();
        });

        component.onDateSelect(selectedDate);
      });

      it('dateMin should have been set', () => {
        expect(selectedDateRange).toEqual({
          dateMin: selectedDateString,
          dateMax: '',
        });
      });

      afterEach(() => {
        dateSelectHandler.unsubscribe();
      });

      afterEach(() => {
        expect(dateRangeServiceSpy.parseDateRange).toHaveBeenCalledWith(
          dateRange
        );
      });
    });

    afterEach(() => {
      expect(dateRangeServiceSpy.formatDate).toHaveBeenCalledWith(selectedDate);
    });
  });

  describe('#startDate', () => {
    it('should have been equal to #dateRangeParsed.dateMin', () => {
      const dateMin = new NgbDate(2020, 2, 14);

      component.dateRangeParsed = {
        dateMin: dateMin,
        dateMax: null,
      };

      expect(component.startDate).toEqual(dateMin);
    });

    it('should have been equal to today', () => {
      component.dateRangeParsed = {
        dateMin: null,
        dateMax: null,
      };

      const calendar = TestBed.inject(NgbCalendar);
      expect(component.startDate).toEqual(calendar.getToday());
    });
  });

  describe('NgbDatepicker', () => {
    let datePicker: DebugElement;

    beforeEach(() => {
      component.dateRangeParsed = {
        dateMin: new NgbDate(2020, 2, 14),
        dateMax: null,
      };

      fixture.detectChanges();
    });

    beforeEach(() => {
      datePicker = fixture.debugElement.query(By.directive(NgbDatepicker));
    });

    it("#startDate should be equal to component's #startDate", () => {
      expect(datePicker.componentInstance.startDate).toEqual(
        component.startDate
      );
    });

    describe('#dateSelect', () => {
      const selectedDate = new NgbDate(2020, 2, 14);
      let onDateSelectSpy: jasmine.Spy;

      beforeEach(() => {
        onDateSelectSpy = spyOn(component, 'onDateSelect');
      });

      beforeEach(() => {
        datePicker.triggerEventHandler('dateSelect', selectedDate);
      });

      it('#onDateSelect should have been called', () => {
        expect(onDateSelectSpy).toHaveBeenCalledWith(selectedDate);
      });
    });
  });

  describe('DateRangeSelectDay', () => {
    let dateRangeSelectDay: DebugElement[];

    beforeEach(() => {
      component.dateRangeParsed = {
        dateMin: new NgbDate(2020, 2, 14),
        dateMax: null,
      };

      fixture.detectChanges();
    });

    beforeEach(() => {
      dateRangeSelectDay = fixture.debugElement.queryAll(
        By.directive(MockDateRangeSelectDayComponent)
      );
    });

    it("#dateRange should be equal to component's #dateRangeParsed", () => {
      const dateRange = new Set<NgbDateRange>(
        dateRangeSelectDay.map((element) => element.componentInstance.dateRange)
      );

      const dateRangeParsed = new Set<NgbDateRange>();
      dateRangeParsed.add(component.dateRangeParsed);

      expect(dateRange).toEqual(dateRangeParsed);
    });
  });
});
