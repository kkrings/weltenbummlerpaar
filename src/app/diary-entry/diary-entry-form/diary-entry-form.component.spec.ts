/**
 * Unit tests for diary entry form component
 * @packageDocumentation
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { DateRange } from '../../date-range/date-range.model';
import { DateRangeService } from '../../date-range/date-range.service';
import { NgbDateRange } from '../../date-range/ngb-date-range.model';
import { DateRangeInputComponent } from '../../date-range/date-range-input/date-range-input.component';
import { DateRangeValueAccessorDirective } from '../../date-range/date-range-value-accessor.directive';
import { MockHttpAlertMessageComponent } from '../../test-utils/mock-http-alert-message.component';
import { MockNgbActiveModal } from '../../test-utils/mock-ngb-active-modal';
import { MockSearchTagSearchComponent } from '../../test-utils/mock-search-tag-search.component';
import {
  TestUtilsModule,
  asyncData,
  asyncError,
} from '../../test-utils/test-utils.module';
import { AlertType } from '../../http-alert/alert.model';
import { Image } from '../../image/image.model';
import { SearchTagSearchComponent } from '../../search-tag/search-tag-search/search-tag-search.component';
import { DiaryEntry } from '../diary-entry.model';
import { DiaryEntryService } from '../diary-entry.service';
import { DiaryEntryFormComponent } from './diary-entry-form.component';

describe('DiaryEntryFormComponent', () => {
  let component: DiaryEntryFormComponent;
  let fixture: ComponentFixture<DiaryEntryFormComponent>;

  const testEntry: DiaryEntry = {
    id: '0',
    title: 'some title',
    location: 'some location',
    body: 'some body',
    images: [],
    searchTags: ['some tag', 'some other tag'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const testImages: Image[] = [
    {
      id: '0',
      description: 'some description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '1',
      description: 'some description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      description: 'some description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      description: 'some description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  beforeEach(async () => {
    const dateRangeServiceSpy = jasmine.createSpyObj('DateRangeService', [
      'parseDateRange',
    ]);

    const diaryEntryServiceSpy = jasmine.createSpyObj('DiaryEntryService', [
      'saveEntry',
      'updateEntry',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FontAwesomeModule, TestUtilsModule],
      declarations: [
        DateRangeInputComponent,
        DateRangeValueAccessorDirective,
        DiaryEntryFormComponent,
      ],
      providers: [
        {
          provide: DateRangeInputComponent,
          useClass: DateRangeInputComponent,
        },
        {
          provide: DateRangeService,
          useValue: dateRangeServiceSpy,
        },
        {
          provide: DiaryEntryService,
          useValue: diaryEntryServiceSpy,
        },
        {
          provide: NgbActiveModal,
          useClass: MockNgbActiveModal,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should render injected modal's title", () => {
    const testTitle = 'some title';
    component.modalTitle = testTitle;
    fixture.detectChanges();
    const modalTitle = fixture.debugElement.query(By.css('.modal-title'));
    expect(modalTitle.nativeElement.textContent).toMatch(testTitle);
  });

  it('should not render empty alert message', () => {
    const httpAlert = fixture.debugElement.query(
      By.directive(MockHttpAlertMessageComponent)
    );
    expect(httpAlert).toBeNull();
  });

  it('should render alert message', () => {
    component.httpAlert.alertType = AlertType.server;
    fixture.detectChanges();
    const httpAlert = fixture.debugElement.query(
      By.directive(MockHttpAlertMessageComponent)
    );
    expect(httpAlert).not.toBeNull();
  });

  it('should not render spinner', () => {
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).toBeNull();
  });

  it('should render spinner', () => {
    component.processRequest = true;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).not.toBeNull();
  });

  it("header's dismiss button should be disabled", () => {
    component.processRequest = true;
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(
      By.css('.modal-header .btn-close')
    );
    expect(closeButton.nativeElement.disabled).toBeTrue();
  });

  it("footer's abort button should be disabled", () => {
    component.processRequest = true;
    fixture.detectChanges();
    const abortButton = fixture.debugElement.query(
      By.css('.modal-footer button.btn.btn-danger')
    );
    expect(abortButton.nativeElement.disabled).toBeTrue();
  });

  it("footer's submit button should be hidden", () => {
    component.processRequest = true;
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(
      By.css('.modal-footer button.btn.btn-primary')
    );
    expect(submitButton.nativeElement.hidden).toBeTrue();
  });

  it('#closeModal should close modal', () => {
    const modal: NgbActiveModal = TestBed.inject(NgbActiveModal);
    spyOn(modal, 'close');
    component.closeModal();
    expect(modal.close).toHaveBeenCalled();
  });

  it("header's dismiss button should trigger #closeModal", () => {
    const closeButton = fixture.debugElement.query(
      By.css('.modal-header .btn-close')
    );
    spyOn(component, 'closeModal');
    closeButton.triggerEventHandler('click', null);
    expect(component.closeModal).toHaveBeenCalled();
  });

  it("footer's abort button should trigger #closeModal", () => {
    const abortButton = fixture.debugElement.query(
      By.css('.modal-footer button.btn.btn-danger')
    );
    spyOn(component, 'closeModal');
    abortButton.triggerEventHandler('click', null);
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('title form control should be empty', () => {
    const titleInput = fixture.debugElement.query(By.css('#title'));
    expect(titleInput.nativeElement.value).toEqual('');
  });

  it('#title.value should match entered title', () => {
    const testTitle = 'some title';
    const titleInput = fixture.debugElement.query(By.css('#title'));
    titleInput.nativeElement.value = testTitle;
    titleInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.title.value).toEqual(testTitle);
  });

  it("title form control should match diary entry's title", () => {
    component.diaryEntry = testEntry;
    component.ngOnInit();
    fixture.detectChanges();
    const titleInput = fixture.debugElement.query(By.css('#title'));
    expect(titleInput.nativeElement.value).toEqual(testEntry.title);
  });

  it("should not render title's validation error", () => {
    const errorMessage = fixture.debugElement.query(By.css('#title + div'));
    expect(errorMessage).toBeNull();
  });

  it("should not render title's validation error when valid", () => {
    const titleInput = fixture.debugElement.query(By.css('#title'));
    titleInput.nativeElement.value = testEntry.title;
    titleInput.nativeElement.dispatchEvent(new Event('input'));
    const errorMessage = fixture.debugElement.query(By.css('#title + div'));
    expect(errorMessage).toBeNull();
  });

  it("should render title's validation error", () => {
    component.title.markAsTouched();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#title + div'));
    expect(errorMessage).not.toBeNull();
  });

  it("should render title's validation error", () => {
    component.title.markAsDirty();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#title + div'));
    expect(errorMessage).not.toBeNull();
  });

  it('location form control should be empty', () => {
    const locationInput = fixture.debugElement.query(By.css('#location'));
    expect(locationInput.nativeElement.value).toEqual('');
  });

  it("location form control should match diary entry's location", () => {
    component.diaryEntry = testEntry;
    component.ngOnInit();
    fixture.detectChanges();
    const locationInput = fixture.debugElement.query(By.css('#location'));
    expect(locationInput.nativeElement.value).toEqual(testEntry.location);
  });

  it('#location.value should match location entered by user', () => {
    const testLocation = 'some location';
    const locationInput = fixture.debugElement.query(By.css('#location'));
    locationInput.nativeElement.value = testLocation;
    locationInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.location.value).toEqual(testLocation);
  });

  it("should not render location's validation error", () => {
    const errorMessage = fixture.debugElement.query(By.css('#location + div'));
    expect(errorMessage).toBeNull();
  });

  it("should not render location's validation error", () => {
    const locationInput = fixture.debugElement.query(By.css('#location'));
    locationInput.nativeElement.value = testEntry.location;
    locationInput.nativeElement.dispatchEvent(new Event('input'));
    const errorMessage = fixture.debugElement.query(By.css('#location + div'));
    expect(errorMessage).toBeNull();
  });

  it("should render location's validation error", () => {
    component.location.markAsTouched();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#location + div'));
    expect(errorMessage).not.toBeNull();
  });

  it("should render location's validation error", () => {
    component.location.markAsDirty();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#location + div'));
    expect(errorMessage).not.toBeNull();
  });

  describe('#dateRange', () => {
    const getErrorMessage = () =>
      fixture.debugElement.query(By.css('#date-range + div'));

    let dateRangeServiceSpy: jasmine.SpyObj<DateRangeService>;
    let dateRangeInput: DebugElement;

    beforeEach(() => {
      dateRangeServiceSpy = TestBed.inject(
        DateRangeService
      ) as jasmine.SpyObj<DateRangeService>;
    });

    beforeEach(() => {
      dateRangeInput = fixture.debugElement.query(
        By.directive(DateRangeInputComponent)
      );
    });

    it('date range form control should be empty', () => {
      expect(dateRangeInput.componentInstance.dateRangeForm.value).toEqual({
        dateMin: '',
        dateMax: '',
      });
    });

    it('error message should not have been rendered', () => {
      expect(getErrorMessage()).toBeNull();
    });

    describe('valid date range', () => {
      const dateRange: DateRange = {
        dateMin: '2020-02-14',
        dateMax: '2020-02-15',
      };

      const dateRangeParsed: NgbDateRange = {
        dateMin: new NgbDate(2020, 2, 14),
        dateMax: new NgbDate(2020, 2, 15),
      };

      beforeEach(() => {
        dateRangeServiceSpy.parseDateRange.and.returnValue(dateRangeParsed);
      });

      describe('#ngOnInit', () => {
        beforeEach(() => {
          component.diaryEntry.dateRange = dateRange;
          component.ngOnInit();
          fixture.detectChanges();
        });

        it('date range form control should be equal to date range', () => {
          expect(dateRangeInput.componentInstance.dateRangeForm.value).toEqual(
            dateRange
          );
        });
      });

      describe('#setValue', () => {
        beforeEach(() => {
          component.dateRange.setValue(dateRange);
          fixture.detectChanges();
        });

        it('date range form control should be equal to date range', () => {
          expect(dateRangeInput.componentInstance.dateRangeForm.value).toEqual(
            dateRange
          );
        });
      });

      describe('input', () => {
        beforeEach(() => {
          dateRangeInput.componentInstance.dateRangeForm.setValue(dateRange);
          fixture.detectChanges();
        });

        it('#dateRange.value should be equal to date range', () => {
          expect(component.dateRange.value).toEqual(dateRange);
        });

        it('error message should not have been rendered', () => {
          expect(getErrorMessage()).toBeNull();
        });

        describe('empty date range', () => {
          beforeEach(() => {
            dateRangeInput.componentInstance.dateRangeForm.setValue({
              dateMin: '',
              dateMax: '',
            });

            fixture.detectChanges();
          });

          it('#dateRange.value should be null', () => {
            expect(component.dateRange.value).toBeNull();
          });
        });
      });

      afterEach(() => {
        expect(dateRangeServiceSpy.parseDateRange).toHaveBeenCalledWith(
          dateRange
        );
      });
    });

    describe('invalid dateMin; empty dateMax', () => {
      const dateRange: DateRange = {
        dateMin: 'invalid date',
        dateMax: '',
      };

      const dateRangeParsed: NgbDateRange = {
        dateMin: null,
        dateMax: null,
      };

      beforeEach(() => {
        dateRangeServiceSpy.parseDateRange.and.returnValue(dateRangeParsed);
      });

      beforeEach(() => {
        dateRangeInput.componentInstance.dateRangeForm.setValue(dateRange);
        fixture.detectChanges();
      });

      it('error message should have been rendered', () => {
        expect(getErrorMessage()).not.toBeNull();
      });

      afterEach(() => {
        expect(dateRangeServiceSpy.parseDateRange).toHaveBeenCalledWith(
          dateRange
        );
      });
    });

    describe('invalid dateMin; valid dateMax', () => {
      const dateRange: DateRange = {
        dateMin: 'invalid date',
        dateMax: '2020-02-15',
      };

      const dateRangeParsed: NgbDateRange = {
        dateMin: null,
        dateMax: new NgbDate(2020, 2, 15),
      };

      beforeEach(() => {
        dateRangeServiceSpy.parseDateRange.and.returnValue(dateRangeParsed);
      });

      beforeEach(() => {
        dateRangeInput.componentInstance.dateRangeForm.setValue(dateRange);
        fixture.detectChanges();
      });

      it('error message should have been rendered', () => {
        expect(getErrorMessage()).not.toBeNull();
      });

      afterEach(() => {
        expect(dateRangeServiceSpy.parseDateRange).toHaveBeenCalledWith(
          dateRange
        );
      });
    });

    describe('empty dateMin; invalid dateMax', () => {
      const dateRange: DateRange = {
        dateMin: '',
        dateMax: 'invalid date',
      };

      const dateRangeParsed: NgbDateRange = {
        dateMin: null,
        dateMax: null,
      };

      beforeEach(() => {
        dateRangeServiceSpy.parseDateRange.and.returnValue(dateRangeParsed);
      });

      beforeEach(() => {
        dateRangeInput.componentInstance.dateRangeForm.setValue(dateRange);
        fixture.detectChanges();
      });

      it('error message should have been rendered', () => {
        expect(getErrorMessage()).not.toBeNull();
      });

      afterEach(() => {
        expect(dateRangeServiceSpy.parseDateRange).toHaveBeenCalledWith(
          dateRange
        );
      });
    });

    describe('valid dateMin; invalid dateMax', () => {
      const dateRange: DateRange = {
        dateMin: '2020-02-14',
        dateMax: 'invalid date',
      };

      const dateRangeParsed: NgbDateRange = {
        dateMin: new NgbDate(2020, 2, 14),
        dateMax: null,
      };

      beforeEach(() => {
        dateRangeServiceSpy.parseDateRange.and.returnValue(dateRangeParsed);
      });

      beforeEach(() => {
        dateRangeInput.componentInstance.dateRangeForm.setValue(dateRange);
        fixture.detectChanges();
      });

      it('error message should have been rendered', () => {
        expect(getErrorMessage()).not.toBeNull();
      });

      afterEach(() => {
        expect(dateRangeServiceSpy.parseDateRange).toHaveBeenCalledWith(
          dateRange
        );
      });
    });

    describe('dateMin after dateMax', () => {
      const dateRange: DateRange = {
        dateMin: '2020-02-15',
        dateMax: '2020-02-14',
      };

      const dateRangeParsed: NgbDateRange = {
        dateMin: new NgbDate(2020, 2, 15),
        dateMax: new NgbDate(2020, 2, 14),
      };

      beforeEach(() => {
        dateRangeServiceSpy.parseDateRange.and.returnValue(dateRangeParsed);
      });

      beforeEach(() => {
        dateRangeInput.componentInstance.dateRangeForm.setValue(dateRange);
        fixture.detectChanges();
      });

      it('error message should have been rendered', () => {
        expect(getErrorMessage()).not.toBeNull();
      });

      afterEach(() => {
        expect(dateRangeServiceSpy.parseDateRange).toHaveBeenCalledWith(
          dateRange
        );
      });
    });

    describe('dateMin equals dateMax', () => {
      const dateRange: DateRange = {
        dateMin: '2020-02-14',
        dateMax: '2020-02-14',
      };

      const dateRangeParsed: NgbDateRange = {
        dateMin: new NgbDate(2020, 2, 14),
        dateMax: new NgbDate(2020, 2, 14),
      };

      beforeEach(() => {
        dateRangeServiceSpy.parseDateRange.and.returnValue(dateRangeParsed);
      });

      beforeEach(() => {
        dateRangeInput.componentInstance.dateRangeForm.setValue(dateRange);
        fixture.detectChanges();
      });

      it('error message should not have been rendered', () => {
        expect(getErrorMessage()).toBeNull();
      });

      afterEach(() => {
        expect(dateRangeServiceSpy.parseDateRange).toHaveBeenCalledWith(
          dateRange
        );
      });
    });

    describe('touched of true emitted', () => {
      beforeEach(() => {
        dateRangeInput.componentInstance.touched.next(true);
      });

      it('#dateRange.touched should be true', () => {
        expect(component.dateRange.touched).toBeTrue();
      });
    });

    describe('touched of false emitted', () => {
      beforeEach(() => {
        dateRangeInput.componentInstance.touched.next(false);
      });

      it('#dateRange.touched should be false', () => {
        expect(component.dateRange.touched).toBeFalse();
      });
    });
  });

  it('body form control should be empty', () => {
    const bodyInput = fixture.debugElement.query(By.css('#body'));
    expect(bodyInput.nativeElement.value).toEqual('');
  });

  it("body form control should match diary entry's body", () => {
    component.diaryEntry = testEntry;
    component.ngOnInit();
    fixture.detectChanges();
    const bodyInput = fixture.debugElement.query(By.css('#body'));
    expect(bodyInput.nativeElement.value).toEqual(testEntry.body);
  });

  it('#body.value should match body entered by user', () => {
    const testBody = 'some body';
    const bodyInput = fixture.debugElement.query(By.css('#body'));
    bodyInput.nativeElement.value = testBody;
    bodyInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.body.value).toEqual(testBody);
  });

  it("should not render body's validation error", () => {
    const errorMessage = fixture.debugElement.query(By.css('#body + div'));
    expect(errorMessage).toBeNull();
  });

  it("should not render body's validation error", () => {
    const bodyInput = fixture.debugElement.query(By.css('#body'));
    bodyInput.nativeElement.value = testEntry.location;
    bodyInput.nativeElement.dispatchEvent(new Event('input'));
    const errorMessage = fixture.debugElement.query(By.css('#body + div'));
    expect(errorMessage).toBeNull();
  });

  it("should render body's validation error", () => {
    component.body.markAsTouched();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#body + div'));
    expect(errorMessage).not.toBeNull();
  });

  it("should render body's validation error", () => {
    component.body.markAsDirty();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#body + div'));
    expect(errorMessage).not.toBeNull();
  });

  it('#tags.value should match tags entered by user', () => {
    const searchTagSearch = TestBed.inject(
      SearchTagSearchComponent
    ) as unknown as MockSearchTagSearchComponent;

    const testTags = ['some tag', 'some other tag'];
    searchTagSearch.searchTagsSource.next(testTags);

    expect(component.searchTags.value).toEqual(testTags);
  });

  it('tags form control should be empty', () => {
    const searchTagSearch = TestBed.inject(SearchTagSearchComponent);
    expect(searchTagSearch.searchTags).toEqual([]);
  });

  it("tags form control should match diary entry's tags", () => {
    const searchTagSearch = TestBed.inject(SearchTagSearchComponent);

    component.diaryEntry = testEntry;
    component.ngOnInit();

    expect(searchTagSearch.searchTags).toEqual(testEntry.searchTags);
  });

  it("should not render diary entry's images", () => {
    const figures = fixture.debugElement.queryAll(By.css('figure'));
    expect(figures.length).toEqual(0);
  });

  it("should render diary entry's images", () => {
    component.imageList = testImages;
    fixture.detectChanges();
    const figures = fixture.debugElement.queryAll(By.css('figure'));
    expect(figures.length).toEqual(testImages.length);
  });

  it("should render diary entry's image descriptions", () => {
    component.imageList = testImages;
    fixture.detectChanges();

    const captions = fixture.debugElement.queryAll(By.css('figcaption'));

    captions.forEach((caption, index) => {
      const image = testImages[index];
      expect(caption.nativeElement.textContent).toMatch(image.description);
    });
  });

  it('#moveImageDown should move image down in image list', () => {
    component.imageList = [...testImages];
    const testImage = component.imageList[0];
    component.moveImageDown(0);
    expect(component.imageList.indexOf(testImage)).toEqual(1);
  });

  it('#moveImageDown should wrap around last entry in image list', () => {
    component.imageList = [...testImages];
    const testIndex = component.imageList.length - 1;
    const testImage = component.imageList[testIndex];
    component.moveImageDown(testIndex);
    expect(component.imageList.indexOf(testImage)).toEqual(0);
  });

  it('move down buttons should trigger #moveImageDown', () => {
    component.imageList = [...testImages];
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(
      By.css('button .fa-arrow-down')
    );
    expect(buttons.length).toEqual(testImages.length);

    spyOn(component, 'moveImageDown');

    buttons.forEach((button, index) => {
      button.parent?.parent?.triggerEventHandler('click', null);
      expect(component.moveImageDown).toHaveBeenCalledWith(index);
    });
  });

  it('#moveImageUp should move image up in image list', () => {
    component.imageList = [...testImages];
    const testImage = component.imageList[1];
    component.moveImageUp(1);
    expect(component.imageList.indexOf(testImage)).toEqual(0);
  });

  it('#moveImageUp should wrap around first entry in image list', () => {
    component.imageList = [...testImages];

    const testImage = component.imageList[0];
    component.moveImageUp(0);

    expect(component.imageList.indexOf(testImage)).toEqual(
      component.imageList.length - 1
    );
  });

  it('move up buttons should trigger #moveImageUp', () => {
    component.imageList = [...testImages];
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(
      By.css('button .fa-arrow-up')
    );
    expect(buttons.length).toEqual(testImages.length);

    spyOn(component, 'moveImageUp');

    buttons.forEach((button, index) => {
      button.parent?.parent?.triggerEventHandler('click', null);
      expect(component.moveImageUp).toHaveBeenCalledWith(index);
    });
  });

  it('#previewImage.value should be null', () => {
    expect(component.previewImage.value).toBeNull();
  });

  it("#previewImage.value should match diary entry's preview image", () => {
    component.diaryEntry.previewImage = testImages[0];
    component.ngOnInit();
    expect(component.previewImage.value).toEqual(testImages[0]);
  });

  it('preview image buttons should set preview image', () => {
    component.imageList = [...testImages];
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('.form-check-input'));
    expect(buttons.length).toEqual(testImages.length);

    buttons[0].triggerEventHandler('change', null);
    expect(component.previewImage.value).toEqual(testImages[0]);
  });

  it('#onSubmit should create new diary entry', waitForAsync(() => {
    component.httpAlert.alertType = AlertType.server;

    const diaryEntry: DiaryEntry = {
      id: component.diaryEntry.id,
      title: testEntry.title,
      location: testEntry.location,
      dateRange: testEntry.dateRange,
      body: testEntry.body,
      previewImage: testEntry.previewImage,
      images: component.diaryEntry.images,
      searchTags: testEntry.searchTags,
      createdAt: component.diaryEntry.createdAt,
      updatedAt: component.diaryEntry.updatedAt,
    };

    component.diaryEntryForm.setValue({
      title: testEntry.title,
      location: testEntry.location,
      dateRange: testEntry.dateRange ?? null,
      body: testEntry.body,
      searchTags: testEntry.searchTags,
      previewImage: testEntry.previewImage ?? null,
    });

    const service = TestBed.inject(
      DiaryEntryService
    ) as jasmine.SpyObj<DiaryEntryService>;

    service.saveEntry.and.returnValue(asyncData(testEntry));

    const modal: NgbActiveModal = TestBed.inject(NgbActiveModal);
    spyOn(modal, 'close');

    component.onSubmit();

    expect(component.httpAlert.alertType).toEqual(AlertType.none);
    expect(component.processRequest).toBeTrue();

    fixture.whenStable().then(() => {
      expect(component.processRequest).toBeFalse();
      expect(component.diaryEntry).toEqual(testEntry);
      expect(service.saveEntry).toHaveBeenCalledWith(diaryEntry);
      expect(modal.close).toHaveBeenCalledWith(testEntry);
    });
  }));

  it('#onSubmit should update injected diary entry', waitForAsync(() => {
    component.diaryEntry = { ...testEntry };
    component.ngOnInit();

    fixture.detectChanges();

    const updatedEntry = {
      ...testEntry,
      dateRange: testEntry.dateRange,
      previewImage: testEntry.previewImage,
    };

    updatedEntry.title = 'updated title';
    component.title.setValue(updatedEntry.title);

    const dateRange: DateRange = {
      dateMin: '2020-02-14',
      dateMax: '2020-02-14',
    };

    updatedEntry.dateRange = dateRange;

    const dateRangeService = TestBed.inject(
      DateRangeService
    ) as jasmine.SpyObj<DateRangeService>;

    dateRangeService.parseDateRange.and.returnValue({
      dateMin: new NgbDate(2020, 2, 14),
      dateMax: new NgbDate(2020, 2, 14),
    });

    component.dateRange.setValue(dateRange);

    updatedEntry.previewImage = testImages[0];
    component.previewImage.setValue(testImages[0]);

    const service = TestBed.inject(
      DiaryEntryService
    ) as jasmine.SpyObj<DiaryEntryService>;

    service.updateEntry.and.returnValue(asyncData(updatedEntry));

    component.onSubmit();

    fixture.whenStable().then(() => {
      expect(service.updateEntry).toHaveBeenCalledWith(updatedEntry);
      expect(component.diaryEntry).toEqual(updatedEntry);
    });
  }));

  it('#onSubmit should set alert message', waitForAsync(() => {
    component.diaryEntry = { ...testEntry };
    component.ngOnInit();

    fixture.detectChanges();

    const service = TestBed.inject(
      DiaryEntryService
    ) as jasmine.SpyObj<DiaryEntryService>;

    const alertType = AlertType.server;
    service.updateEntry.and.returnValue(asyncError(alertType));

    component.onSubmit();

    fixture.whenStable().then(() => {
      expect(component.processRequest).toBeFalse();
      expect(component.httpAlert.alertType).toEqual(alertType);
    });
  }));
});
