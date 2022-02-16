/**
 * Unit tests for diary entry search service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';
import { NEVER, Observable, of, Subscription, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

import { AlertType } from '../../http-alert/alert.model';
import { DiaryEntry } from '../diary-entry.model';
import { DiaryEntryService } from '../diary-entry.service';
import { DiaryEntrySearchConfig } from './diary-entry-search.config';
import { DiaryEntrySearchResult } from './diary-entry-search.model';
import { DiaryEntrySearchService } from './diary-entry-search.service';

/**
 * Mock diary entry service
 */
class MockDiaryEntryService {
  constructor(private readonly diaryEntries: DiaryEntry[]) {}

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
  getEntries(
    tags: string[] = [],
    skip = 0,
    limit = -1
  ): Observable<DiaryEntry[]> {
    const diaryEntries = this.filterEntries(tags);
    const end = limit > 0 ? skip + limit : diaryEntries.length;

    return of(diaryEntries.slice(skip, end));
  }

  private filterEntries(tags: string[] = []): DiaryEntry[] {
    return this.diaryEntries.filter((diaryEntry) =>
      tags.every((tag) => diaryEntry.searchTags.includes(tag))
    );
  }
}

describe('DiaryEntrySearchService', () => {
  const diaryEntries: DiaryEntry[] = [
    {
      id: '0',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      searchTags: ['some tag', 'some other tag'],
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '1',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      searchTags: ['some tag', 'some other tag', 'yet another tag'],
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      searchTags: ['a tag the others do not have'],
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const limitNumEntries = 2;

  let diaryEntryService: MockDiaryEntryService;
  let diaryEntrySearchService: DiaryEntrySearchService;

  beforeEach(() => {
    diaryEntryService = new MockDiaryEntryService(diaryEntries);
  });

  beforeEach(() => {
    const diaryEntrySearchConfig: DiaryEntrySearchConfig = { limitNumEntries };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: DiaryEntrySearchConfig,
          useValue: diaryEntrySearchConfig,
        },
        {
          provide: DiaryEntryService,
          useValue: diaryEntryService,
        },
        DiaryEntrySearchService,
      ],
    });

    diaryEntrySearchService = TestBed.inject(DiaryEntrySearchService);
  });

  describe('no search tag emission yet', () => {
    let onDiaryEntries: Subscription;

    beforeEach(() => {
      onDiaryEntries = Subscription.EMPTY;
    });

    beforeEach(() => {
      diaryEntrySearchService.subscribeToSearchTags(NEVER);
    });

    it('#diaryEntries$ emits no diary entries', (done) => {
      onDiaryEntries = diaryEntrySearchService.diaryEntries$.subscribe(
        (result) => {
          expect(result).toEqual({
            searchTags: [],
            entries: [],
            numEntries: -1,
          });
          done();
        },
        fail
      );
    });

    afterEach(() => {
      diaryEntrySearchService.unsubscribeFromSearchTags();
    });

    afterEach(() => {
      onDiaryEntries.unsubscribe();
    });
  });

  describe('empty search tag emission', () => {
    let onDiaryEntries: Subscription;

    beforeEach(() => {
      onDiaryEntries = Subscription.EMPTY;
    });

    beforeEach(() => {
      diaryEntrySearchService.subscribeToSearchTags(of([]));
    });

    it('#diaryEntries$ emits diary entries w/o search tags', (done) => {
      const expectation: DiaryEntrySearchResult = {
        searchTags: [],
        entries: diaryEntries.slice(0, limitNumEntries),
        numEntries: diaryEntries.length,
      };

      onDiaryEntries = diaryEntrySearchService.diaryEntries$.subscribe(
        (result) => {
          expect(result).toEqual(expectation);
          done();
        },
        fail
      );
    });

    it('#moreEntries emits more diary entries w/o search tags', (done) => {
      const expectation = diaryEntries.slice(limitNumEntries);

      diaryEntrySearchService
        .moreEntries([], limitNumEntries)
        .subscribe((entries) => {
          expect(entries).toEqual(expectation);
          done();
        }, fail);
    });

    afterEach(() => {
      diaryEntrySearchService.unsubscribeFromSearchTags();
    });

    afterEach(() => {
      onDiaryEntries.unsubscribe();
    });
  });

  describe('search tag emission', () => {
    const searchTags = ['some tag', 'some other tag'];

    let onDiaryEntries: Subscription;

    beforeEach(() => {
      onDiaryEntries = Subscription.EMPTY;
    });

    beforeEach(() => {
      diaryEntrySearchService.subscribeToSearchTags(of(searchTags));
    });

    it('#diaryEntries$ emits diary entries w/ search tags', (done) => {
      const expectation: DiaryEntrySearchResult = {
        searchTags: searchTags,
        entries: diaryEntries.slice(0, 2),
        numEntries: 2,
      };

      onDiaryEntries = diaryEntrySearchService.diaryEntries$.subscribe(
        (result) => {
          expect(result).toEqual(expectation);
          done();
        },
        fail
      );
    });

    it('#moreEntries does not emit more diary entries', (done) => {
      diaryEntrySearchService
        .moreEntries(searchTags, limitNumEntries)
        .subscribe((entries) => {
          expect(entries).toEqual([]);
          done();
        }, fail);
    });

    afterEach(() => {
      diaryEntrySearchService.unsubscribeFromSearchTags();
    });

    afterEach(() => {
      onDiaryEntries.unsubscribe();
    });
  });

  describe('#getEntries throws an error', () => {
    let onDiaryEntries: Subscription;

    beforeEach(() => {
      onDiaryEntries = Subscription.EMPTY;
    });

    beforeEach(() => {
      spyOn(diaryEntryService, 'getEntries').and.returnValue(
        throwError(AlertType.server)
      );
    });

    beforeEach(() => {
      diaryEntrySearchService.subscribeToSearchTags(of([]));
    });

    it('#diaryEntries$ passes the error through', (done) => {
      onDiaryEntries = diaryEntrySearchService.diaryEntries$.subscribe(
        fail,
        (alertType) => {
          expect(alertType).toEqual(AlertType.server);
          done();
        }
      );
    });

    afterEach(() => {
      diaryEntrySearchService.unsubscribeFromSearchTags();
    });

    afterEach(() => {
      onDiaryEntries.unsubscribe();
    });
  });

  describe('#countEntries throws an error', () => {
    let onDiaryEntries: Subscription;

    beforeEach(() => {
      onDiaryEntries = Subscription.EMPTY;
    });

    beforeEach(() => {
      spyOn(diaryEntryService, 'countEntries').and.returnValue(
        throwError(AlertType.server)
      );
    });

    beforeEach(() => {
      diaryEntrySearchService.subscribeToSearchTags(of([]));
    });

    it('#diaryEntries$ passes the error through', (done) => {
      onDiaryEntries = diaryEntrySearchService.diaryEntries$.subscribe(
        fail,
        (alertType) => {
          expect(alertType).toEqual(AlertType.server);
          done();
        }
      );
    });

    afterEach(() => {
      diaryEntrySearchService.unsubscribeFromSearchTags();
    });

    afterEach(() => {
      onDiaryEntries.unsubscribe();
    });
  });

  describe('#searching$', () => {
    it('is toggled', () => {
      const testScheduler = new TestScheduler((actual, expected) =>
        expect(actual).toEqual(expected)
      );

      testScheduler.run(({ cold, expectObservable }) => {
        const searchTags$ = cold<string[]>('-a', {
          a: [],
        });

        diaryEntrySearchService.subscribeToSearchTags(searchTags$);

        const countEntries$ = diaryEntryService.countEntries();

        spyOn(diaryEntryService, 'countEntries').and.returnValue(
          countEntries$.pipe(delay(2))
        );

        expectObservable(diaryEntrySearchService.searching$).toBe('ab-c', {
          a: false,
          b: true,
          c: false,
        });
      });
    });

    afterEach(() => {
      diaryEntrySearchService.unsubscribeFromSearchTags();
    });
  });
});
