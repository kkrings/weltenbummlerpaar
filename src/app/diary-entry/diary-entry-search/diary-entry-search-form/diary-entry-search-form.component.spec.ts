import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryEntrySearchFormComponent } from './diary-entry-search-form.component';

describe('DiaryEntrySearchComponent', () => {
  let component: DiaryEntrySearchFormComponent;
  let fixture: ComponentFixture<DiaryEntrySearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaryEntrySearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntrySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
