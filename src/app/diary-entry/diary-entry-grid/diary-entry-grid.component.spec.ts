/**
 * Unit tests for diary entry grid component
 * @packageDocumentation
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryGridComponent } from './diary-entry-grid.component';
import { DiaryEntry } from '../diary-entry.model';
import { DIARY_ENTRIES } from '../diary-entries';


/**
 * Mock diary entry card component
 */
@Component({
  selector: 'app-diary-entry-card'
})
class MockDiaryEntryCardComponent {
  /**
   * Mock injected diary entry
   */
  @Input() diaryEntry: DiaryEntry;

  /**
   * ID of mock diary entry that should be removed from list of shown diary
   * entries.
   */
  @Output() deletedEntryId = new EventEmitter<string>();
}


describe('DiaryEntryGridComponent', () => {
  let component: DiaryEntryGridComponent;
  let fixture: ComponentFixture<DiaryEntryGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbAlertModule
      ],
      declarations: [
        DiaryEntryGridComponent,
        MockDiaryEntryCardComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryGridComponent);
    component = fixture.componentInstance;
    component.diaryEntries = [...DIARY_ENTRIES];
    fixture.detectChanges();
  });

  it('should render diary entries on grid', () => {
    const entryCards = fixture.debugElement.queryAll(
        By.css('app-diary-entry-card'));

    expect(entryCards.length).toEqual(component.diaryEntries.length);
  });

  it('should not render alert message', () => {
    const message = fixture.debugElement.query(By.css('ngb-alert'));
    expect(message).toBeNull();
  });

  it('should render alert message', () => {
    component.diaryEntries = [];
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('ngb-alert'));
    expect(message).not.toBeNull();
  });

  it('#deleteDiaryEntry should remove diary entry from view', () => {
    const testId = component.diaryEntries[0]._id;
    component.deleteDiaryEntry(testId);
    const entryIds = component.diaryEntries.map(diaryEntry => diaryEntry._id);
    expect(entryIds).not.toContain(testId);
  });
});
