/**
 * Unit tests for root component
 * @packageDocumentation
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { DiaryEntrySearchService } from './diary-entry/diary-entry-search/diary-entry-search.service';
import { DiaryEntrySearchResult } from './diary-entry/diary-entry-search/diary-entry-search.model';
import { DiaryEntry } from './diary-entry/diary-entry.model';
import { AlertType } from './http-alert/alert.model';
import { MockHttpAlertMessageComponent } from './test-utils/mock-http-alert-message.component';
import {
  TestUtilsModule,
  asyncData,
  asyncError,
} from './test-utils/test-utils.module';

/**
 * Mock diary entry search form
 */
@Component({
  selector: 'app-diary-entry-search-form',
})
class MockDiaryEntrySearchFormComponent {}

/**
 * Mock diary entry load more component
 */
@Component({
  selector: 'app-diary-entry-load-more',
})
class MockDiaryEntryLoadMoreComponent {
  @Output() moreEntries = new EventEmitter<DiaryEntry[]>();
}

/**
 * Mock navigation bar component
 */
@Component({
  selector: 'app-navbar',
})
class MockNavbarComponent {
  /**
   * Mock emitted diary entry
   */
  @Output() newDiaryEntry = new EventEmitter<DiaryEntry>();
}

/**
 * Mock diary entry grid component
 */
@Component({
  selector: 'app-diary-entry-grid',
})
class MockDiaryEntryGridComponent {
  /**
   * Mock injected list of diary entries
   */
  @Input() diaryEntries: DiaryEntry[] = [];
}

/**
 * Mock diary entry search service
 */
interface MockDiaryEntrySearchService {
  /**
   * Mock source of diary entry search results
   */
  diaryEntries$: Observable<DiaryEntrySearchResult>;
  /**
   * Mock searching status
   */
  searching$: Observable<boolean>;
}

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let mockDiaryEntrySearchService: MockDiaryEntrySearchService;

  const diaryEntries: DiaryEntry[] = [
    {
      id: '0',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      images: [],
      searchTags: ['some tag', 'some other tag'],
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

  const diaryEntrySearchResult: DiaryEntrySearchResult = {
    searchTags: [],
    entries: diaryEntries,
    numEntries: diaryEntries.length,
  };

  beforeEach(async () => {
    mockDiaryEntrySearchService = {
      diaryEntries$: asyncData(diaryEntrySearchResult),
      searching$: asyncData(false),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TestUtilsModule],
      declarations: [
        AppComponent,
        MockDiaryEntrySearchFormComponent,
        MockDiaryEntryLoadMoreComponent,
        MockNavbarComponent,
        MockDiaryEntryGridComponent,
      ],
      providers: [
        {
          provide: DiaryEntrySearchService,
          useValue: mockDiaryEntrySearchService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should retrieve list of diary entries', waitForAsync(() => {
    expect(app.showSpinner).toBeTrue();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(app.showSpinner).toBeFalse();
      expect(app.diaryEntries).toEqual(diaryEntries);
    });
  }));

  it('should set alert message', waitForAsync(() => {
    app.showSpinner = true;

    mockDiaryEntrySearchService.diaryEntries$ = asyncError(AlertType.server);
    app.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(app.showSpinner).toBeFalse();
      expect(app.httpAlert.isShown).toBeTrue();
    });
  }));

  it('should not render list of diary entries', () => {
    const diaryEntryGrid = fixture.debugElement.query(
      By.directive(MockDiaryEntryGridComponent)
    );
    expect(diaryEntryGrid).toBeNull();
  });

  it('should render list of diary entries', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const diaryEntryGrid = fixture.debugElement.query(
        By.directive(MockDiaryEntryGridComponent)
      );
      const component = diaryEntryGrid.injector.get(
        MockDiaryEntryGridComponent
      );
      expect(component.diaryEntries).toEqual(app.diaryEntries);
    });
  }));

  it('should render spinner', () => {
    app.showSpinner = true;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).not.toBeNull();
  });

  it('should not render spinner', () => {
    app.showSpinner = false;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).toBeNull();
  });

  it('should not render alert message', () => {
    const httpAlert = fixture.debugElement.query(
      By.directive(MockHttpAlertMessageComponent)
    );
    expect(httpAlert).toBeNull();
  });

  it('should render alert message', () => {
    app.showSpinner = false;
    app.httpAlert.alertType = AlertType.server;
    fixture.detectChanges();
    const httpAlert = fixture.debugElement.query(
      By.directive(MockHttpAlertMessageComponent)
    );
    expect(httpAlert).not.toBeNull();
  });

  it('should add diary entry', () => {
    app.diaryEntries = [];
    fixture.detectChanges();

    const navbar = fixture.debugElement.query(
      By.directive(MockNavbarComponent)
    );
    const component = navbar.injector.get(MockNavbarComponent);

    const diaryEntry: DiaryEntry = {
      id: '1',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      images: [],
      searchTags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    component.newDiaryEntry.emit(diaryEntry);

    fixture.detectChanges();
    expect(app.diaryEntries).toContain(diaryEntry);
  });

  it('should load more diary entries', () => {
    app.diaryEntries = [];
    fixture.detectChanges();

    const loadMoreButton = fixture.debugElement.query(
      By.directive(MockDiaryEntryLoadMoreComponent)
    );

    const component = loadMoreButton.injector.get(
      MockDiaryEntryLoadMoreComponent
    );

    const diaryEntry: DiaryEntry = {
      id: '1',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      images: [],
      searchTags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    component.moreEntries.emit([diaryEntry]);

    fixture.detectChanges();
    expect(app.diaryEntries).toContain(diaryEntry);
  });
});
