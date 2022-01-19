import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';

import { DiaryEntryLoadMoreComponent } from './diary-entry-load-more.component';
import { DiaryEntrySearchResult } from '../diary-entry-search.model';
import { DiaryEntrySearchService } from '../diary-entry-search.service';
import { TestUtilsModule } from '../../../test-utils/test-utils.module';

class MockDiaryEntrySearchService {
  diaryEntries$: Observable<DiaryEntrySearchResult>;

  searching$: Observable<boolean>;

  diaryEntriesSource = new BehaviorSubject<DiaryEntrySearchResult>({
    searchTags: [],
    entries: [],
    numEntries: -1,
  });

  searchingSource = new BehaviorSubject<boolean>(false);

  constructor() {
    this.diaryEntries$ = this.diaryEntriesSource.asObservable();
    this.searching$ = this.searchingSource.asObservable();
  }
}

describe('DiaryEntryLoadMoreComponent', () => {
  let component: DiaryEntryLoadMoreComponent;
  let fixture: ComponentFixture<DiaryEntryLoadMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestUtilsModule],
      declarations: [DiaryEntryLoadMoreComponent],
      providers: [
        {
          provide: DiaryEntrySearchService,
          useClass: MockDiaryEntrySearchService,
        },
      ],
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
