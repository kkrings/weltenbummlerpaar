/**
 * Unit tests for date range service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';
import { NgbDate, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { DateRange } from './date-range.model';
import { DateRangeService } from './date-range.service';
import { NgbDateRange } from './ngb-date-range.model';

describe('DateRangeService', () => {
  const validDateRange: DateRange = {
    dateMin: '2020-02-14',
    dateMax: '2020-02-15',
  };

  const validDateRangeParsed: NgbDateRange = {
    dateMin: new NgbDate(2020, 2, 14),
    dateMax: new NgbDate(2020, 2, 15),
  };

  const emptyDateRange: DateRange = {
    dateMin: '',
    dateMax: '',
  };

  const emptyDateRangeParsed: NgbDateRange = {
    dateMin: null,
    dateMax: null,
  };

  const invalidDateRange: DateRange = {
    dateMin: 'invalid date',
    dateMax: 'invalid date',
  };

  const invalidDateRangeParsed: NgbDateRange = {
    dateMin: null,
    dateMax: null,
  };

  let service: DateRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbDatepickerModule],
    });

    service = TestBed.inject(DateRangeService);
  });

  describe('parseDate', () => {
    it('valid date should have been parsed correctly', () => {
      expect(service.parseDate(validDateRange.dateMin)).toEqual(
        validDateRangeParsed.dateMin
      );
    });

    it('empty date should have been parsed correctly', () => {
      expect(service.parseDate(emptyDateRange.dateMin)).toEqual(
        emptyDateRangeParsed.dateMin
      );
    });

    it('invalid date should have been parsed correctly', () => {
      expect(service.parseDate(invalidDateRange.dateMin)).toEqual(
        invalidDateRangeParsed.dateMin
      );
    });
  });

  describe('parseDateRange', () => {
    it('valid date range should have been parsed correctly', () => {
      expect(service.parseDateRange(validDateRange)).toEqual(
        validDateRangeParsed
      );
    });

    it('empty date range should have been parsed correctly', () => {
      expect(service.parseDateRange(emptyDateRange)).toEqual(
        emptyDateRangeParsed
      );
    });

    it('invalid date range should have been parsed correctly', () => {
      expect(service.parseDateRange(invalidDateRange)).toEqual(
        invalidDateRangeParsed
      );
    });
  });

  describe('formatDate', () => {
    it('valid date should have been formatted correctly', () => {
      expect(service.formatDate(validDateRangeParsed.dateMin)).toEqual(
        validDateRange.dateMin
      );
    });

    it('empty date have been formatted correctly', () => {
      expect(service.formatDate(emptyDateRangeParsed.dateMin)).toEqual(
        emptyDateRange.dateMin
      );
    });
  });

  describe('formatDateRange', () => {
    it('valid date range should have been formatted correctly', () => {
      expect(service.formatDateRange(validDateRangeParsed)).toEqual(
        validDateRange
      );
    });

    it('empty date range should have been formatted correctly', () => {
      expect(service.formatDateRange(emptyDateRangeParsed)).toEqual(
        emptyDateRange
      );
    });
  });
});
