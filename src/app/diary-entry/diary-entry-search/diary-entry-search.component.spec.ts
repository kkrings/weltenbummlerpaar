import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryEntrySearchComponent } from './diary-entry-search.component';

describe('DiaryEntrySearchComponent', () => {
  let component: DiaryEntrySearchComponent;
  let fixture: ComponentFixture<DiaryEntrySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaryEntrySearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntrySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
