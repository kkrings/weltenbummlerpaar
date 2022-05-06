/**
 * Unit tests for date range input component
 * @packageDocumentation
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { MockDateRangeSelectComponent } from '../../test-utils/mock-date-range-select.component';
import { DateRange } from '../date-range.model';
import { DateRangeInputComponent } from './date-range-input.component';

describe('DiaryEntryDatePickerComponent', () => {
  let component: DateRangeInputComponent;
  let fixture: ComponentFixture<DateRangeInputComponent>;
  let dateMinInput: DebugElement;
  let dateMaxInput: DebugElement;

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

  beforeEach(() => {
    dateMinInput = fixture.debugElement.query(By.css('#date-min'));
    dateMaxInput = fixture.debugElement.query(By.css('#date-max'));
  });

  describe('#dateRangeForm', () => {
    const dateRange: DateRange = {
      dateMin: '2020-02-14',
      dateMax: '2020-02-15',
    };

    it("date-min's value should be an empty string", () => {
      expect(dateMinInput.nativeElement.value).toEqual('');
    });

    it("date-min's value should be an empty string", () => {
      expect(dateMaxInput.nativeElement.value).toEqual('');
    });

    describe('#setValue', () => {
      beforeEach(() => {
        component.dateRangeForm.setValue(dateRange);
        fixture.detectChanges();
      });

      it("date-min's value should be equal to #dateMin", () => {
        expect(dateMinInput.nativeElement.value).toEqual(dateRange.dateMin);
      });

      it("date-max's value should be equal to #dateMax", () => {
        expect(dateMaxInput.nativeElement.value).toEqual(dateRange.dateMax);
      });
    });

    describe('input', () => {
      let dateRangeFormValue: DateRange;

      beforeEach(() => {
        dateMinInput.nativeElement.value = dateRange.dateMin;
        dateMinInput.nativeElement.dispatchEvent(new Event('input'));
      });

      beforeEach(() => {
        dateMaxInput.nativeElement.value = dateRange.dateMax;
        dateMaxInput.nativeElement.dispatchEvent(new Event('input'));
      });

      beforeEach(() => {
        dateRangeFormValue = component.dateRangeForm.value;
      });

      it("#dateMin should be equal to date-min's value", () => {
        expect(dateRangeFormValue.dateMin).toEqual(dateRange.dateMin);
      });

      it("#dateMax should be equal to date-max's value", () => {
        expect(dateRangeFormValue.dateMax).toEqual(dateRange.dateMax);
      });
    });
  });

  describe('#touched', () => {
    let touchedHandler: Subscription;
    let emittedTouched: boolean;

    beforeEach(() => {
      emittedTouched = false;
    });

    beforeEach(() => {
      touchedHandler = Subscription.EMPTY;
    });

    describe('on date-min blur', () => {
      beforeEach((done) => {
        touchedHandler = component.touched.subscribe((touched) => {
          emittedTouched = touched;
          done();
        });

        dateMinInput.triggerEventHandler('blur', null);
      });

      it('true should have been emitted', () => {
        expect(emittedTouched).toBeTrue();
      });
    });

    describe('on date-max blur', () => {
      beforeEach((done) => {
        touchedHandler = component.touched.subscribe((touched) => {
          emittedTouched = touched;
          done();
        });

        dateMaxInput.triggerEventHandler('blur', null);
      });

      it('true should have been emitted', () => {
        expect(emittedTouched).toBeTrue();
      });
    });

    afterEach(() => {
      touchedHandler.unsubscribe();
    });
  });

  describe('DateRangeSelectComponent', () => {
    const dateRange: DateRange = {
      dateMin: '2020-02-14',
      dateMax: '2020-02-15',
    };

    let dateRangeSelect: DebugElement;

    beforeEach(() => {
      component.dateRangeForm.setValue(dateRange);
      fixture.detectChanges();
    });

    beforeEach(() => {
      dateRangeSelect = fixture.debugElement.query(
        By.directive(MockDateRangeSelectComponent)
      );
    });

    it("#dateRange should be equal to #dateRangeForm's value", () => {
      expect(dateRangeSelect.componentInstance.dateRange).toEqual(dateRange);
    });

    describe('on #dateRangeSelect', () => {
      const selectedDateRange: DateRange = {
        dateMin: '2020-02-16',
        dateMax: '2020-02-17',
      };

      beforeEach(() => {
        dateRangeSelect.triggerEventHandler(
          'dateRangeSelect',
          selectedDateRange
        );
      });

      it("#dateRangeForm's value should be equal to date range", () => {
        expect(component.dateRangeForm.value).toEqual(selectedDateRange);
      });
    });
  });
});
