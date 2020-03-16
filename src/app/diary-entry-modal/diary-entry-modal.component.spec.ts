/**
 * Unit tests for diary entry modal component
 * @packageDocumentation
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryModalComponent } from './diary-entry-modal.component';
import { DIARY_ENTRIES } from '../shared/diary-entries';


describe('DiaryEntryModalComponent', () => {
  let component: DiaryEntryModalComponent;
  let fixture: ComponentFixture<DiaryEntryModalComponent>;

  const testDiaryEntry = DIARY_ENTRIES[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DiaryEntryModalComponent
      ],
      providers: [
        NgbActiveModal
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryModalComponent);
    component = fixture.componentInstance;
    component.diaryEntry = testDiaryEntry;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
