import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { DateRangeSelectDayComponent } from './date-range-select-day.component';

describe('DateRangeSelectDayComponent', () => {
  let component: DateRangeSelectDayComponent;
  let fixture: ComponentFixture<DateRangeSelectDayComponent>;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
