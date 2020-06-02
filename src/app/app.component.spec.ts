/**
 * Unit tests for root component
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DiaryEntryService } from './diary-entry/diary-entry.service';
import { DiaryEntry } from './diary-entry/diary-entry.model';
import { asyncData, asyncError } from './shared/test-utils';


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
    tags: [],
    createdAt: (new Date()).toISOString(),
    updatedAt: (new Date()).toISOString()
  }];

  beforeEach(async(() => {
    const diaryEntryServiceSpy = jasmine.createSpyObj(
        'DiaryEntryService', ['getEntries']);

    diaryEntryServiceSpy.getEntries.and.returnValue(asyncData(diaryEntries));

    TestBed.configureTestingModule({
      imports: [
        NgbAlertModule
      ],
      declarations: [
        AppComponent,
        MockNavbarComponent,
        MockDiaryEntryGridComponent
      ],
      providers: [
        {provide: DiaryEntryService, useValue: diaryEntryServiceSpy}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should retrieve list of diary entries', async(() => {
    app.showSpinner = true;
    app.ngOnInit();

    fixture.whenStable().then(() => {
      expect(app.showSpinner).toBeFalse();
      expect(app.diaryEntries).toEqual(diaryEntries);
    });
  }));

  it('should set alert message', async(() => {
    const diaryEntryService = TestBed.inject(DiaryEntryService) as
        jasmine.SpyObj<DiaryEntryService>;

    const alertMessage = 'This is a mock alert message';
    diaryEntryService.getEntries.and.returnValue(asyncError(alertMessage));

    app.showSpinner = true;
    app.ngOnInit();

    fixture.whenStable().then(() => {
      expect(app.showSpinner).toBeFalse();
      expect(app.alertMessage).toEqual(alertMessage);
    });
  }));

  it('should not render list of diary entries', () => {
    const diaryEntryGrid = fixture.debugElement.query(
        By.directive(MockDiaryEntryGridComponent));

    expect(diaryEntryGrid).toBeNull();
  });

  it('should render list of diary entries', async(() => {
    app.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const diaryEntryGrid = fixture.debugElement.query(
          By.directive(MockDiaryEntryGridComponent));

      const component = diaryEntryGrid.injector.get(
          MockDiaryEntryGridComponent);

      expect(component.diaryEntries).toEqual(app.diaryEntries);
    });
  }));

  it('images\' alt attribute should match #welcomeMessage', () => {
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images[0].nativeElement.alt).toEqual(app.welcomeMessage);
  });

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
    const ngbAlert = fixture.debugElement.query(By.css('ngb-alert'));
    expect(ngbAlert).toBeNull();
  });

  it('should render alert message', () => {
    const alertMessage = 'This is a mock alert message';
    app.alertMessage = alertMessage;
    fixture.detectChanges();
    const ngbAlert = fixture.debugElement.query(By.css('ngb-alert'));
    expect(ngbAlert.nativeElement.textContent).toMatch(alertMessage);
  });

  it('should add diary entry', () => {
    app.diaryEntries = [];
    fixture.detectChanges();

    const navbar = fixture.debugElement.query(
        By.directive(MockNavbarComponent));

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
  });
});
