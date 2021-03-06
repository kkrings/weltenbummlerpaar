/**
 * Unit tests for diary entry search service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { DiaryEntrySearchService } from './diary-entry-search.service';
import { DiaryEntrySearchConfig } from './diary-entry-search.config';
import { DiaryEntryService } from '../diary-entry.service';
import { DiaryEntry } from '../diary-entry.model';
import { DiaryEntrySearchResult } from './diary-entry-search.model';
import { AlertType } from 'src/app/http-alert/alert.model';


/**
 * Mock diary entry service
 */
class MockDiaryEntryService {
  /**
   * Diary entry search service configuration for unit tests
   */
  static searchConfig = {waitForTags: 2, limitNumEntries: 2};

  #diaryEntries: DiaryEntry[] = [
    {
      _id: '0',
      title: 'some title',
      locationName: 'some location',
      body: 'some body',
      tags: ['some tag', 'some other tag'],
      images: [],
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    },
    {
      _id: '1',
      title: 'some title',
      locationName: 'some location',
      body: 'some body',
      tags: ['some tag', 'some other tag', 'yet another tag'],
      images: [],
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    },
    {
      _id: '2',
      title: 'some title',
      locationName: 'some location',
      body: 'some body',
      tags: ['a tag the others do not have'],
      images: [],
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    }
  ];

  /**
   * Simulate counting the number of diary entries available in total on the
   * back-end server.
   *
   * @param tags
   *   List of search tags
   *
   * @returns
   *   Number of diary entries available in total
   */
  countEntries(tags: string[] = []): Observable<number> {
    return of(this.filterEntries(tags).length);
  }

  /**
   * Simulate searching for diary entries on the back-end server.
   *
   * @param tags
   *   List of search tags
   * @param skip
   *   Skip the given number of diary entries
   * @param limit
   *   Limit the diary entries by the given number
   *
   * @returns
   *   Found diary entries
   */
  getEntries(tags: string[] = [], skip = 0, limit = -1): Observable<DiaryEntry[]> {
    const diaryEntries = this.filterEntries(tags);
    const end = limit > 0 ? skip + limit : diaryEntries.length;

    return of(diaryEntries.slice(skip, end));
  }

  /**
   * Expected search results emitted from the diary entry search service.
   *
   * @param tags
   *   List of search tags
   *
   * @returns
   *   Expected search result
   */
  getExpectation(tags: string[] = []): DiaryEntrySearchResult {
    const allEntries = this.filterEntries(tags);
    const firstEntries = allEntries.slice(0, MockDiaryEntryService.searchConfig.limitNumEntries);

    return new DiaryEntrySearchResult(tags, firstEntries, {loaded: firstEntries.length, total: allEntries.length});
  }

  private filterEntries(tags: string[] = []): DiaryEntry[] {
    return this.#diaryEntries.filter(diaryEntry => tags.every(tag => diaryEntry.tags.includes(tag)));
  }
}


describe('DiaryEntrySearchService', () => {
  let diaryEntrySearchService: DiaryEntrySearchService;

  const mockDiaryEntryService = new MockDiaryEntryService();
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DiaryEntrySearchService,
        {provide: DiaryEntryService, useValue: mockDiaryEntryService},
        {provide: DiaryEntrySearchConfig, useValue: MockDiaryEntryService.searchConfig}
      ]
    });

    diaryEntrySearchService = TestBed.inject(DiaryEntrySearchService);
  });

  beforeEach(() => testScheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected)));

  it('#diaryEntries$ emits no diary entries', () => testScheduler.run(({cold, expectObservable}) => {
    const searchTags$ = cold('--|');

    diaryEntrySearchService.subscribeToSearchTags(searchTags$);

    expectObservable(diaryEntrySearchService.diaryEntries$, '^-!').toBe('a--', {
      a: new DiaryEntrySearchResult()
    });

    expectObservable(diaryEntrySearchService.searching$, '^-!').toBe('a--', {
      a: false
    });
  }));

  it('#diaryEntries$ emits diary entries w/o search tags', () => testScheduler.run(({cold, expectObservable}) => {
    const searchTags$ = cold('a--|', {a: ''});

    diaryEntrySearchService.subscribeToSearchTags(searchTags$);

    expectObservable(diaryEntrySearchService.diaryEntries$).toBe('a-b-', {
      a: new DiaryEntrySearchResult(),
      b: mockDiaryEntryService.getExpectation()
    });

    expectObservable(diaryEntrySearchService.searching$).toBe('a-b-', {
      a: true,
      b: false
    });
  }));

  it('#diaryEntries$ emits diary entries w/ search tags', () => testScheduler.run(({cold, expectObservable}) => {
    const searchTags = ['some tag', 'some other tag'];

    const searchTags$ = cold('a--|', {
      a: searchTags.join(', ')
    });

    diaryEntrySearchService.subscribeToSearchTags(searchTags$);

    expectObservable(diaryEntrySearchService.diaryEntries$).toBe('a-b-', {
      a: new DiaryEntrySearchResult(),
      b: mockDiaryEntryService.getExpectation(searchTags)
    });

    expectObservable(diaryEntrySearchService.searching$).toBe('a-b-', {
      a: true,
      b: false
    });
  }));

  it('#diaryEntries$ emits diary entries w/ type ahead', () => testScheduler.run(({cold, expectObservable}) => {
    const searchTags = ['some tag', 'some other tag'];

    const searchTags$ = cold('ab--|', {
      a: searchTags[0],
      b: searchTags.join(', ')
    });

    diaryEntrySearchService.subscribeToSearchTags(searchTags$);

    expectObservable(diaryEntrySearchService.diaryEntries$).toBe('a--b-', {
      a: new DiaryEntrySearchResult(),
      b: mockDiaryEntryService.getExpectation(searchTags)
    });

    expectObservable(diaryEntrySearchService.searching$).toBe('ab-c-', {
      a: true,
      b: true,
      c: false
    });
  }));

  it('#diaryEntries$ passes through error from #getEntries', () => testScheduler.run(({cold, expectObservable}) => {
    const searchTags$ = cold('a--|', {
      a: ''
    });

    diaryEntrySearchService.subscribeToSearchTags(searchTags$);
    spyOn(mockDiaryEntryService, 'getEntries').and.returnValue(throwError(AlertType.server));

    expectObservable(diaryEntrySearchService.diaryEntries$).toBe('a-#-', {
      a: new DiaryEntrySearchResult(),
    }, AlertType.server);

    expectObservable(diaryEntrySearchService.searching$).toBe('a-b-', {
      a: true,
      b: false
    });
  }));

  it('#diaryEntries$ passes through error from #countEntries', () => testScheduler.run(({cold, expectObservable}) => {
    const searchTags$ = cold('a--|', {
      a: ''
    });

    diaryEntrySearchService.subscribeToSearchTags(searchTags$);
    spyOn(mockDiaryEntryService, 'countEntries').and.returnValue(throwError(AlertType.server));

    expectObservable(diaryEntrySearchService.diaryEntries$).toBe('a-#-', {
      a: new DiaryEntrySearchResult(),
    }, AlertType.server);

    expectObservable(diaryEntrySearchService.searching$).toBe('a-b-', {
      a: true,
      b: false
    });
  }));

  afterEach(() => diaryEntrySearchService.unsubscribeFromSearchTags());
});
