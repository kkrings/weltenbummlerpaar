import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbDate, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateRange } from '../ngb-date-range.model';
import { DateRangeSelectDayComponent } from './date-range-select-day.component';

describe('DateRangeSelectDayComponent', () => {
  let component: DateRangeSelectDayComponent;
  let fixture: ComponentFixture<DateRangeSelectDayComponent>;
  let dateDay: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbDatepickerModule],
      declarations: [DateRangeSelectDayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeSelectDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    dateDay = fixture.debugElement.query(By.css('div'));
  });

  describe('#dateRange.dateMin null; #dateRange.dateMax null', () => {
    beforeEach(() => {
      component.dateRange = { dateMin: null, dateMax: null };
      component.date = new NgbDate(2020, 2, 14);
      fixture.detectChanges();
    });

    it('correct classes should have been applied', () => {
      expect(dateDay.classes).toEqual({
        'text-center': true,
      });
    });

    it("#date's day should have been rendered", () => {
      expect(dateDay.nativeElement.textContent).toMatch('14');
    });
  });

  describe('#dateRange.dateMin not null; #dateRange.dateMax null', () => {
    const dateMin = new NgbDate(2020, 2, 14);

    beforeEach(() => {
      component.dateRange = { dateMin: dateMin, dateMax: null };
    });

    describe('#date not equals #dateRange.dateMin', () => {
      beforeEach(() => {
        component.date = new NgbDate(2020, 2, 15);
        fixture.detectChanges();
      });

      it('correct classes should have been applied', () => {
        expect(dateDay.classes).toEqual({
          'text-center': true,
        });
      });

      it("#date's day should have been rendered", () => {
        expect(dateDay.nativeElement.textContent).toMatch('15');
      });
    });

    describe('#date equals #dateRange.dateMin', () => {
      beforeEach(() => {
        component.date = dateMin;
        fixture.detectChanges();
      });

      it('correct classes should have been applied', () => {
        expect(dateDay.classes).toEqual({
          'text-center': true,
          'date-min': true,
        });
      });

      it("#date's day should have been rendered", () => {
        expect(dateDay.nativeElement.textContent).toMatch('14');
      });
    });
  });

  describe('#dateRange.dateMin null; #dateRange.dateMax not null', () => {
    const dateMax = new NgbDate(2020, 2, 14);

    beforeEach(() => {
      component.dateRange = { dateMin: null, dateMax: dateMax };
    });

    describe('#date not equals #dateRange.dateMax', () => {
      beforeEach(() => {
        component.date = new NgbDate(2020, 2, 15);
        fixture.detectChanges();
      });

      it('correct classes should have been applied', () => {
        expect(dateDay.classes).toEqual({
          'text-center': true,
        });
      });

      it("#date's day should have been rendered", () => {
        expect(dateDay.nativeElement.textContent).toMatch('15');
      });
    });

    describe('#date equals #dateRange.dateMax', () => {
      beforeEach(() => {
        component.date = dateMax;
        fixture.detectChanges();
      });

      it('correct classes should have been applied', () => {
        expect(dateDay.classes).toEqual({
          'text-center': true,
        });
      });

      it("#date's day should have been rendered", () => {
        expect(dateDay.nativeElement.textContent).toMatch('14');
      });
    });
  });

  describe('#dateRange.dateMin not null; #dateRange.dateMax not null', () => {
    const dateRange: NgbDateRange = {
      dateMin: new NgbDate(2020, 2, 14),
      dateMax: new NgbDate(2020, 2, 16),
    };

    beforeEach(() => {
      component.dateRange = dateRange;
    });

    describe('#date outside of #dateRange', () => {
      beforeEach(() => {
        component.date = new NgbDate(2020, 2, 13);
        fixture.detectChanges();
      });

      it('correct classes should have been applied', () => {
        expect(dateDay.classes).toEqual({
          'text-center': true,
        });
      });

      it("#date's day should have been rendered", () => {
        expect(dateDay.nativeElement.textContent).toMatch('13');
      });
    });

    describe('#date equals #dateRange.dateMin', () => {
      beforeEach(() => {
        component.date = dateRange.dateMin!;
        fixture.detectChanges();
      });

      it('correct classes should have been applied', () => {
        expect(dateDay.classes).toEqual({
          'text-center': true,
          'date-min': true,
        });
      });

      it("#date's day should have been rendered", () => {
        expect(dateDay.nativeElement.textContent).toMatch('14');
      });
    });

    describe('#date inside of #dateRange', () => {
      beforeEach(() => {
        component.date = new NgbDate(2020, 2, 15);
        fixture.detectChanges();
      });

      it('correct classes should have been applied', () => {
        expect(dateDay.classes).toEqual({
          'text-center': true,
          'date-inside': true,
        });
      });

      it("#date's day should have been rendered", () => {
        expect(dateDay.nativeElement.textContent).toMatch('15');
      });
    });

    describe('#date equals #dateRange.dateMax', () => {
      beforeEach(() => {
        component.date = dateRange.dateMax!;
        fixture.detectChanges();
      });

      it('correct classes should have been applied', () => {
        expect(dateDay.classes).toEqual({
          'text-center': true,
          'date-max': true,
        });
      });

      it("#date's day should have been rendered", () => {
        expect(dateDay.nativeElement.textContent).toMatch('16');
      });
    });
  });
});
