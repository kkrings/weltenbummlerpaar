/**
 * Unit tests for root component
 * @packageDocumentation
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpAlertMessageComponent } from './http-alert/http-alert-message/http-alert-message.component';
import { AlertType } from './http-alert/alert.model';
import { DiaryEntrySearchService } from './diary-entry/diary-entry-search/diary-entry-search.service';
import { DiaryEntrySearchResult } from './diary-entry/diary-entry-search/diary-entry-search.model';
import { DiaryEntry } from './diary-entry/diary-entry.model';

import * as testUtils from './test-utils/test-utils.module';


/**
 * Mock diary entry search form
 */
@Component({
  selector: 'app-diary-entry-search-form'
})
class MockDiaryEntrySearchFormComponent { }

/**
 * Mock navigation bar component
 */
@Component({
  selector: 'app-navbar'
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
  selector: 'app-diary-entry-grid'
})
class MockDiaryEntryGridComponent {
  /**
   * Mock injected list of diary entries
   */
  @Input() diaryEntries: DiaryEntry[] = [];
}


describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const diaryEntries: DiaryEntry[] = [{
    _id: '0',
    title: 'some title',
    locationName: 'some location',
    body: 'some body',
    images: [],
    tags: ['some tag', 'some other tag'],
    createdAt: (new Date()).toISOString(),
    updatedAt: (new Date()).toISOString()
  }, {
    _id: '1',
    title: 'some title',
    locationName: 'some location',
    body: 'some body',
    images: [],
    tags: [],
    createdAt: (new Date()).toISOString(),
    updatedAt: (new Date()).toISOString()
  }];

  const diaryEntrySearchResult = new DiaryEntrySearchResult(
      [],
      diaryEntries,
      {loaded: diaryEntries.length, total: diaryEntries.length});

  beforeEach(async () => {
    const mockDiaryEntrySearchService = {
      diaryEntries$: testUtils.asyncData(diaryEntrySearchResult),
      searching$: testUtils.asyncData(false)
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        testUtils.TestUtilsModule
      ],
      declarations: [
        AppComponent,
        MockDiaryEntrySearchFormComponent,
        MockNavbarComponent,
        MockDiaryEntryGridComponent
      ],
      providers: [
        {provide: DiaryEntrySearchService, useValue: mockDiaryEntrySearchService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should retrieve list of diary entries', waitForAsync(() => {
    expect(app.showSpinner).toBeTrue();

    app.ngOnInit();

    fixture.whenStable().then(() => {
      expect(app.showSpinner).toBeFalse();
      expect(app.diaryEntries).toEqual(diaryEntries);
    });
  }));

  /*it('should set alert message', waitForAsync(() => {
    const diaryEntrySearchService = TestBed.inject(DiaryEntrySearchService) as jasmine.SpyObj<DiaryEntrySearchService>;

    diaryEntrySearchService.diaryEntries$ = asyncError(AlertType.server);
    diaryEntrySearchService.searching$ = asyncData(false);

    app.showSpinner = true;
    app.ngOnInit();

    fixture.whenStable().then(() => {
      expect(app.showSpinner).toBeFalse();
      expect(app.httpAlert.isShown).toBeTrue();
    });
  }));

  it('should not render list of diary entries', () => {
    const diaryEntryGrid = fixture.debugElement.query(By.directive(MockDiaryEntryGridComponent));
    expect(diaryEntryGrid).toBeNull();
  });

  it('should render list of diary entries', waitForAsync(() => {
    app.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const diaryEntryGrid = fixture.debugElement.query(By.directive(MockDiaryEntryGridComponent));
      const component = diaryEntryGrid.injector.get(MockDiaryEntryGridComponent);
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
    const httpAlert = fixture.debugElement.query(By.directive(HttpAlertMessageComponent));
    expect(httpAlert).toBeNull();
  });

  it('should render alert message', () => {
    app.httpAlert.alertType = AlertType.server;
    fixture.detectChanges();
    const httpAlert = fixture.debugElement.query(By.directive(HttpAlertMessageComponent));
    expect(httpAlert).not.toBeNull();
  });

  it('should add diary entry', () => {
    app.diaryEntries = [];
    fixture.detectChanges();

    const navbar = fixture.debugElement.query(By.directive(MockNavbarComponent));
    const component = navbar.injector.get(MockNavbarComponent);

    const diaryEntry: DiaryEntry = {
      _id: '1',
      title: 'some title',
      locationName: 'some location',
      body: 'some body',
      images: [],
      tags: [],
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    component.newDiaryEntry.emit(diaryEntry);

    fixture.detectChanges();
    expect(app.diaryEntries).toContain(diaryEntry);
  });*/
});
