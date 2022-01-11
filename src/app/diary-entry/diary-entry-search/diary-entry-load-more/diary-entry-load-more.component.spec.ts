import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryEntryLoadMoreComponent } from './diary-entry-load-more.component';

describe('DiaryEntryLoadMoreComponent', () => {
  let component: DiaryEntryLoadMoreComponent;
  let fixture: ComponentFixture<DiaryEntryLoadMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiaryEntryLoadMoreComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryLoadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
