/**
 * Unit tests for diary entry grid component
 * @packageDocumentation
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryGridComponent } from './diary-entry-grid.component';
import { DiaryEntry } from '../diary-entry.model';

/**
 * Mock diary entry card component
 */
@Component({
  selector: 'app-diary-entry-card',
})
class MockDiaryEntryCardComponent {
  /**
   * Mock injected diary entry
   */
  @Input() diaryEntry: DiaryEntry = {
    id: '',
    title: '',
    location: '',
    body: '',
    images: [],
    searchTags: [],
    createdAt: '',
    updatedAt: '',
  };

  /**
   * ID of mock diary entry that should be removed from list of shown diary
   * entries.
   */
  @Output() deletedEntryId = new EventEmitter<string>();
}

describe('DiaryEntryGridComponent', () => {
  let component: DiaryEntryGridComponent;
  let fixture: ComponentFixture<DiaryEntryGridComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [NgbAlertModule],
      declarations: [DiaryEntryGridComponent, MockDiaryEntryCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryGridComponent);
    component = fixture.componentInstance;

    component.diaryEntries = [
      {
        id: '0',
        title: 'some title',
        location: 'some location',
        body: 'some body',
        images: [],
        searchTags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '1',
        title: 'some title',
        location: 'some location',
        body: 'some body',
        images: [],
        searchTags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    fixture.detectChanges();
  });

  it('should render diary entries on grid', () => {
    const entryCards = fixture.debugElement.queryAll(
      By.directive(MockDiaryEntryCardComponent)
    );
    expect(entryCards.length).toEqual(component.diaryEntries.length);
  });

  it('should not render alert message', () => {
    const message = fixture.debugElement.query(By.directive(NgbAlert));
    expect(message).toBeNull();
  });

  it('should render alert message', () => {
    component.diaryEntries = [];
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.directive(NgbAlert));
    expect(message).not.toBeNull();
  });

  it('#deleteDiaryEntry should remove diary entry from view', () => {
    const testId = component.diaryEntries[0].id;
    component.deleteDiaryEntry(testId);
    const entryIds = component.diaryEntries.map((diaryEntry) => diaryEntry.id);
    expect(entryIds).not.toContain(testId);
  });
});
