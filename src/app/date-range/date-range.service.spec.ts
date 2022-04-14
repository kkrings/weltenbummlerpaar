import { TestBed } from '@angular/core/testing';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { DateRangeService } from './date-range.service';

describe('DateRangeService', () => {
  let service: DateRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbDatepickerModule],
    });

    service = TestBed.inject(DateRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
