/**
 * Unit tests for diary entry form component
 * @packageDocumentation
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryFormComponent } from './diary-entry-form.component';
import { DiaryEntryService } from '../diary-entry.service';
import { DiaryEntry } from '../diary-entry.model';
import { Image } from '../../image/image.model';
import { AlertType } from 'src/app/http-alert/alert.model';

import * as testUtils from '../../test-utils/test-utils.module';


describe('DiaryEntryFormComponent', () => {
  let component: DiaryEntryFormComponent;
  let fixture: ComponentFixture<DiaryEntryFormComponent>;

  const testEntry: DiaryEntry = {
    _id: '0',
    title: 'some title',
    locationName: 'some location',
    body: 'some body',
    images: [],
    tags: ['some tag', 'some other tag'],
    createdAt: (new Date()).toISOString(),
    updatedAt: (new Date()).toISOString()
  };

  const testImages: Image[] = [{
    _id: '0',
    description: 'some description',
    createdAt: (new Date()).toISOString(),
    updatedAt: (new Date()).toISOString()
  }, {
    _id: '1',
    description: 'some description',
    createdAt: (new Date()).toISOString(),
    updatedAt: (new Date()).toISOString()
  }, {
    _id: '2',
    description: 'some description',
    createdAt: (new Date()).toISOString(),
    updatedAt: (new Date()).toISOString()
  }, {
    _id: '3',
    description: 'some description',
    createdAt: (new Date()).toISOString(),
    updatedAt: (new Date()).toISOString()
  }];

  beforeEach(async () => {
    const diaryEntryServiceSpy = jasmine.createSpyObj('DiaryEntryService', ['saveEntry', 'updateEntry']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        testUtils.TestUtilsModule
      ],
      declarations: [
        DiaryEntryFormComponent
      ],
      providers: [
        {provide: DiaryEntryService, useValue: diaryEntryServiceSpy},
        {provide: NgbActiveModal, useClass: testUtils.MockNgbActiveModal}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render injected modal\'s title', () => {
    const testTitle = 'some title';
    component.modalTitle = testTitle;
    fixture.detectChanges();
    const modalTitle = fixture.debugElement.query(By.css('.modal-title'));
    expect(modalTitle.nativeElement.textContent).toMatch(testTitle);
  });

  it('should not render empty alert message', () => {
    const httpAlert = fixture.debugElement.query(By.directive(testUtils.MockHttpAlertMessageComponent));
    expect(httpAlert).toBeNull();
  });

  it('should render alert message', () => {
    component.httpAlert.alertType = AlertType.server;
    fixture.detectChanges();
    const httpAlert = fixture.debugElement.query(By.directive(testUtils.MockHttpAlertMessageComponent));
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

  it('header\'s dismiss button should be disabled', () => {
    component.processRequest = true;
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(By.css('.modal-header button.close'));
    expect(closeButton.nativeElement.disabled).toBeTrue();
  });

  it('footer\'s abort button should be disabled', () => {
    component.processRequest = true;
    fixture.detectChanges();
    const abortButton = fixture.debugElement.query(By.css('.modal-footer button.btn.btn-danger'));
    expect(abortButton.nativeElement.disabled).toBeTrue();
  });

  it('footer\'s submit button should be hidden', () => {
    component.processRequest = true;
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('.modal-footer button.btn.btn-primary'));
    expect(submitButton.nativeElement.hidden).toBeTrue();
  });

  it('#closeModal should close modal', () => {
    const modal: NgbActiveModal = TestBed.inject(NgbActiveModal);
    spyOn(modal, 'close');
    component.closeModal();
    expect(modal.close).toHaveBeenCalled();
  });

  it('header\'s dismiss button should trigger #closeModal', () => {
    const closeButton = fixture.debugElement.query(By.css('.modal-header button.close'));
    spyOn(component, 'closeModal');
    closeButton.triggerEventHandler('click', null);
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('footer\'s abort button should trigger #closeModal', () => {
    const abortButton = fixture.debugElement.query(By.css('.modal-footer button.btn.btn-danger'));
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

  it('title form control should match diary entry\'s title', () => {
    component.diaryEntry = testEntry;
    component.ngOnInit();
    fixture.detectChanges();
    const titleInput = fixture.debugElement.query(By.css('#title'));
    expect(titleInput.nativeElement.value).toEqual(testEntry.title);
  });

  it('should not render title\'s validation error', () => {
    const errorMessage = fixture.debugElement.query(By.css('#title + div'));
    expect(errorMessage).toBeNull();
  });

  it('should not render title\'s validation error when valid', () => {
    const titleInput = fixture.debugElement.query(By.css('#title'));
    titleInput.nativeElement.value = testEntry.title;
    titleInput.nativeElement.dispatchEvent(new Event('input'));
    const errorMessage = fixture.debugElement.query(By.css('#title + div'));
    expect(errorMessage).toBeNull();
  });

  it('should render title\'s validation error', () => {
    component.title.markAsTouched();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#title + div'));
    expect(errorMessage).not.toBeNull();
  });

  it('should render title\'s validation error', () => {
    component.title.markAsDirty();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#title + div'));
    expect(errorMessage).not.toBeNull();
  });

  it('location form control should be empty', () => {
    const locationInput = fixture.debugElement.query(By.css('#location'));
    expect(locationInput.nativeElement.value).toEqual('');
  });

  it('location form control should match diary entry\'s location', () => {
    component.diaryEntry = testEntry;
    component.ngOnInit();
    fixture.detectChanges();
    const locationInput = fixture.debugElement.query(By.css('#location'));
    expect(locationInput.nativeElement.value).toEqual(testEntry.locationName);
  });

  it('#location.value should match location entered by user', () => {
    const testLocation = 'some location';
    const locationInput = fixture.debugElement.query(By.css('#location'));
    locationInput.nativeElement.value = testLocation;
    locationInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.locationName.value).toEqual(testLocation);
  });

  it('should not render location\'s validation error', () => {
    const errorMessage = fixture.debugElement.query(By.css('#location + div'));
    expect(errorMessage).toBeNull();
  });

  it('should not render location\'s validation error', () => {
    const locationInput = fixture.debugElement.query(By.css('#location'));
    locationInput.nativeElement.value = testEntry.locationName;
    locationInput.nativeElement.dispatchEvent(new Event('input'));
    const errorMessage = fixture.debugElement.query(By.css('#location + div'));
    expect(errorMessage).toBeNull();
  });

  it('should render location\'s validation error', () => {
    component.locationName.markAsTouched();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#location + div'));
    expect(errorMessage).not.toBeNull();
  });

  it('should render location\'s validation error', () => {
    component.locationName.markAsDirty();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#location + div'));
    expect(errorMessage).not.toBeNull();
  });

  it('body form control should be empty', () => {
    const bodyInput = fixture.debugElement.query(By.css('#body'));
    expect(bodyInput.nativeElement.value).toEqual('');
  });

  it('body form control should match diary entry\'s body', () => {
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

  it('should not render body\'s validation error', () => {
    const errorMessage = fixture.debugElement.query(By.css('#body + div'));
    expect(errorMessage).toBeNull();
  });

  it('should not render body\'s validation error', () => {
    const bodyInput = fixture.debugElement.query(By.css('#body'));
    bodyInput.nativeElement.value = testEntry.locationName;
    bodyInput.nativeElement.dispatchEvent(new Event('input'));
    const errorMessage = fixture.debugElement.query(By.css('#body + div'));
    expect(errorMessage).toBeNull();
  });

  it('should render body\'s validation error', () => {
    component.body.markAsTouched();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#body + div'));
    expect(errorMessage).not.toBeNull();
  });

  it('should render body\'s validation error', () => {
    component.body.markAsDirty();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#body + div'));
    expect(errorMessage).not.toBeNull();
  });

  it('#tags.value should match tags entered by user', () => {
    const testTags = 'some tag, some other tag';
    const tagsInput = fixture.debugElement.query(By.css('#tags'));
    tagsInput.nativeElement.value = testTags;
    tagsInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.tags.value).toEqual(testTags);
  });

  it('tags form control should be empty', () => {
    const tagsInput = fixture.debugElement.query(By.css('#tags'));
    expect(tagsInput.nativeElement.value).toEqual('');
  });

  it('tags form control should match diary entry\'s tags', () => {
    component.diaryEntry = testEntry;
    component.ngOnInit();
    fixture.detectChanges();
    const tagsInput = fixture.debugElement.query(By.css('#tags'));
    expect(tagsInput.nativeElement.value).toEqual(testEntry.tags.join(', '));
  });

  it('should not render diary entry\'s images', () => {
    const figures = fixture.debugElement.queryAll(By.css('figure'));
    expect(figures.length).toEqual(0);
  });

  it('should render diary entry\'s images', () => {
    component.imageList = testImages;
    fixture.detectChanges();
    const figures = fixture.debugElement.queryAll(By.css('figure'));
    expect(figures.length).toEqual(testImages.length);
  });

  it('should render diary entry\'s image descriptions', () => {
    component.imageList = testImages;
    fixture.detectChanges();

    const captions = fixture.debugElement.queryAll(By.css('figcaption'));

    captions.forEach((caption, index) => {
      const image = testImages[index];
      expect(caption.nativeElement.textContent).toEqual(image.description);
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

    const buttons = fixture.debugElement.queryAll(By.css('.fa-arrow-down'));
    expect(buttons.length).toEqual(testImages.length);

    spyOn(component, 'moveImageDown');

    buttons.forEach((button, index) => {
      if (button.parent) {
        button.parent.triggerEventHandler('click', null);
        expect(component.moveImageDown).toHaveBeenCalledWith(index);
      }
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

    expect(component.imageList.indexOf(testImage)).toEqual(component.imageList.length - 1);
  });

  it('move up buttons should trigger #moveImageUp', () => {
    component.imageList = [...testImages];
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('.fa-arrow-up'));
    expect(buttons.length).toEqual(testImages.length);

    spyOn(component, 'moveImageUp');

    buttons.forEach((button, index) => {
      if (button.parent) {
        button.parent.triggerEventHandler('click', null);
        expect(component.moveImageUp).toHaveBeenCalledWith(index);
      }
    });
  });

  it('#onSubmit should create new diary entry', waitForAsync(() => {
    component.httpAlert.alertType = AlertType.server;

    const diaryEntry: DiaryEntry = {
      _id: component.diaryEntry._id,
      title: testEntry.title,
      locationName: testEntry.locationName,
      body: testEntry.body,
      images: component.diaryEntry.images,
      tags: testEntry.tags,
      createdAt: component.diaryEntry.createdAt,
      updatedAt: component.diaryEntry.updatedAt
    };

    component.diaryEntryForm.setValue({
      title: testEntry.title,
      locationName: testEntry.locationName,
      body: testEntry.body,
      tags: testEntry.tags.join(', ')
    });

    const service = TestBed.inject(DiaryEntryService) as jasmine.SpyObj<DiaryEntryService>;

    service.saveEntry.and.returnValue(testUtils.asyncData(testEntry));

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
    component.diaryEntry = {...testEntry};
    component.ngOnInit();

    fixture.detectChanges();

    const updatedEntry = {...testEntry};
    updatedEntry.title = 'updated title';
    component.title.setValue(updatedEntry.title);

    const service = TestBed.inject(DiaryEntryService) as jasmine.SpyObj<DiaryEntryService>;
    service.updateEntry.and.returnValue(testUtils.asyncData(updatedEntry));

    component.onSubmit();

    fixture.whenStable().then(() => {
      expect(service.updateEntry).toHaveBeenCalledWith(updatedEntry);
      expect(component.diaryEntry).toEqual(updatedEntry);
    });
  }));

  it('#onSubmit should set alert message', waitForAsync(() => {
    component.diaryEntry = {...testEntry};
    component.ngOnInit();

    fixture.detectChanges();

    const service = TestBed.inject(DiaryEntryService) as jasmine.SpyObj<DiaryEntryService>;

    const alertType = AlertType.server;
    service.updateEntry.and.returnValue(testUtils.asyncError(alertType));

    component.onSubmit();

    fixture.whenStable().then(() => {
      expect(component.processRequest).toBeFalse();
      expect(component.httpAlert.alertType).toEqual(alertType);
    });
  }));
});
