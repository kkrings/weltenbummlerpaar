/**
 * Unit tests for diary entry card component
 * @packageDocumentation
 */

import { Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { DiaryEntryCardComponent } from './diary-entry-card.component';
import { DiaryEntryBriefPipe } from '../diary-entry-brief.pipe';
import { DiaryEntryService } from '../diary-entry.service';
import { DiaryEntry } from '../diary-entry.model';
import { DIARY_ENTRIES } from '../diary-entries';


/**
 * Mock diary entry service
 */
class MockDiaryEntryService {
  /**
   * Mock diary entry delete method
   *
   * @param diaryEntry
   *   Diary entry that should be deleted
   *
   * @returns
   *   Deleted diary entry
   */
  deleteEntry(diaryEntry: DiaryEntry): Observable<DiaryEntry> {
    return of(diaryEntry);
  }
}

/**
 * Mock image directive
 */
@Directive({
  selector: '[appImage]'
})
class MockImageDirective {
  /**
   * Mock image
   */
  @Input('appImage') mockImage = null;
}


describe('DiaryEntryCardComponent', () => {
  let component: DiaryEntryCardComponent;
  let fixture: ComponentFixture<DiaryEntryCardComponent>;

  const testDiaryEntry = DIARY_ENTRIES[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DiaryEntryCardComponent,
        DiaryEntryBriefPipe,
        MockImageDirective
      ],
      providers: [
        {provide: DiaryEntryService, useClass: MockDiaryEntryService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryCardComponent);
    component = fixture.componentInstance;
    component.diaryEntry = testDiaryEntry;
    fixture.detectChanges();
  });

  it('should render diary entry\'s title', () => {
    const cardTitle = fixture.nativeElement.querySelector('.card-title');
    expect(cardTitle.textContent).toMatch(testDiaryEntry.title);
  });

  it('should render diary entry\'s location name', () => {
    const cardSubtitle = fixture.nativeElement.querySelector('.card-subtitle');
    expect(cardSubtitle.textContent).toMatch(testDiaryEntry.locationName);
  });
});
