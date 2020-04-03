/**
 * Unit tests for diary entry card component
 * @packageDocumentation
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { DiaryEntryCardComponent } from './diary-entry-card.component';
import { DiaryEntryService } from '../diary-entry.service';
import { DiaryEntry } from '../diary-entry.model';
import { DIARY_ENTRIES } from '../diary-entries';
import { ImageService } from '../../image/image.service';


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


describe('DiaryEntryCardComponent', () => {
  let component: DiaryEntryCardComponent;
  let fixture: ComponentFixture<DiaryEntryCardComponent>;

  const testDiaryEntry = DIARY_ENTRIES[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DiaryEntryCardComponent
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

  it('#getImageUrl should return image\'s URL', () => {
    const testImage = testDiaryEntry.images[0];
    const imageUrl = component.getImageUrl(testImage);
    expect(imageUrl).toMatch(ImageService.getImageUrl(testImage));
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
