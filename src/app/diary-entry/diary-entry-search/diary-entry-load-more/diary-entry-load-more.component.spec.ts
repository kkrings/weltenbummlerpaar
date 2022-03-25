import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';

import { AlertType } from '../../../http-alert/alert.model';
import {
  asyncData,
  MockHttpAlertMessageComponent,
  TestUtilsModule,
} from '../../../test-utils/test-utils.module';
import { DiaryEntry } from '../../diary-entry.model';
import { DiaryEntrySearchResult } from '../diary-entry-search.model';
import { DiaryEntrySearchService } from '../diary-entry-search.service';
import { DiaryEntryLoadMoreComponent } from './diary-entry-load-more.component';

class MockDiaryEntrySearchService {
  diaryEntries$: Observable<DiaryEntrySearchResult>;

  searching$: Observable<boolean>;

  diaryEntriesSource = new BehaviorSubject<DiaryEntrySearchResult>({
    searchTags: [],
    entries: [],
    numEntries: -1,
  });

  searchingSource = new BehaviorSubject<boolean>(false);

  diaryEntries: DiaryEntry[] = [
    {
      id: 'some ID',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      searchTags: ['some search tag'],
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'some other ID',
      title: 'some other title',
      location: 'some other location',
      body: 'some other body',
      searchTags: ['some search tag'],
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  constructor() {
    this.diaryEntries$ = this.diaryEntriesSource.asObservable();
    this.searching$ = this.searchingSource.asObservable();
  }

  moreEntries(tags: string[], skip: number): Observable<DiaryEntry[]> {
    const entries = this.diaryEntries.filter((entry) =>
      this.filter(entry, tags)
    );

    return asyncData(entries.slice(skip));
  }

  private filter(entry: DiaryEntry, tags: string[]): boolean {
    return tags.every((tag) => entry.searchTags.includes(tag));
  }
}

describe('DiaryEntryLoadMoreComponent', () => {
  let service: MockDiaryEntrySearchService;
  let component: DiaryEntryLoadMoreComponent;
  let fixture: ComponentFixture<DiaryEntryLoadMoreComponent>;

  beforeEach(() => {
    service = new MockDiaryEntrySearchService();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestUtilsModule],
      declarations: [DiaryEntryLoadMoreComponent],
      providers: [
        {
          provide: DiaryEntrySearchService,
          useValue: service,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryLoadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#searching should have been toggled', () => {
    expect(component.searching).toBeFalse();
    service.searchingSource.next(true);
    expect(component.searching).toBeTrue();
  });

  it('load more button should have been disabled', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('spinner should not have been rendered', () => {
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).toBeNull();
  });

  it('spinner should have been rendered', () => {
    component.loading = true;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).not.toBeNull();
  });

  it('alert should not have been rendered', () => {
    const alert = fixture.debugElement.query(
      By.directive(MockHttpAlertMessageComponent)
    );

    expect(alert).toBeNull();
  });

  it('alert should have been rendered', () => {
    component.httpAlert.alertType = AlertType.server;
    fixture.detectChanges();

    const alert = fixture.debugElement.query(
      By.directive(MockHttpAlertMessageComponent)
    );

    expect(alert).not.toBeNull();
  });

  describe('diary entry search', () => {
    const numLoaded = 1;

    let searchTags: string[];

    beforeEach(() => {
      searchTags = service.diaryEntries[0].searchTags;
    });

    beforeEach(() => {
      service.diaryEntriesSource.next({
        searchTags: searchTags,
        entries: service.diaryEntries.slice(0, numLoaded),
        numEntries: service.diaryEntries.length,
      });
    });

    beforeEach(() => {
      fixture.detectChanges();
    });

    it('#numEntriesTotal should have been set', () => {
      expect(component.numEntriesTotal).toEqual(service.diaryEntries.length);
    });

    it('#numEntriesLoaded should have been set', () => {
      expect(component.numEntriesLoaded).toEqual(numLoaded);
    });

    it('load more button should have been enabled', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.disabled).toBeFalse();
    });

    describe('#loadMoreEntries', () => {
      describe('#moreEntries', () => {
        let onMoreEntries: Subscription;

        beforeEach(() => {
          onMoreEntries = Subscription.EMPTY;
        });

        it('more diary entries should have been emitted', (done) => {
          onMoreEntries = component.moreEntries.subscribe((entries) => {
            expect(entries).toEqual(service.diaryEntries.slice(1));
            done();
          }, fail);

          component.loadMoreEntries();
        });

        afterEach(() => {
          onMoreEntries.unsubscribe();
        });
      });

      it('#numEntriesLoaded should have been updated', waitForAsync(async () => {
        component.loadMoreEntries();
        await fixture.whenStable();
        expect(component.numEntriesLoaded).toEqual(component.numEntriesTotal);
      }));

      it('#loading should have been toggled', waitForAsync(async () => {
        expect(component.loading).toBeFalse();
        component.loadMoreEntries();
        expect(component.loading).toBeTrue();
        await fixture.whenStable();
        expect(component.loading).toBeFalse();
      }));

      it('should be stopped by new search', () => {
        component.loadMoreEntries();
        expect(component.loading).toBeTrue();
        service.searchingSource.next(true);
        expect(component.loading).toBeFalse();
      });

      describe('on error', () => {
        beforeEach(() => {
          spyOn(service, 'moreEntries').and.returnValue(
            throwError(AlertType.server)
          );
        });

        beforeEach(() => {
          component.loadMoreEntries();
        });

        it('server error should have been set', () => {
          expect(component.httpAlert.alertType).toEqual(AlertType.server);
        });

        it('#loading should be false', () => {
          expect(component.loading).toBeFalse();
        });
      });
    });

    it('#loadMoreEntries should have been called', () => {
      spyOn(component, 'loadMoreEntries');
      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', null);
      expect(component.loadMoreEntries).toHaveBeenCalled();
    });

    it('load more button should be disabled while loading', () => {
      component.loading = true;
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.disabled).toBeTrue();
    });

    it('load more button should be disabled while searching', () => {
      component.searching = true;
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.disabled).toBeTrue();
    });
  });
});
