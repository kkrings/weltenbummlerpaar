/**
 * Unit tests for diary entry card component
 * @packageDocumentation
 */

import { Directive, LOCALE_ID } from '@angular/core';

import {
  ComponentFixture, TestBed, waitForAsync
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { registerLocaleData, formatDate } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import {
  NgbAlertModule, NgbModal, NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryCardComponent } from './diary-entry-card.component';
import { DiaryEntryBriefPipe } from '../diary-entry-brief.pipe';
import { DiaryEntryService } from '../diary-entry.service';
import { DiaryEntry } from '../diary-entry.model';

import {
  DiaryEntryModalComponent
} from '../diary-entry-modal/diary-entry-modal.component';

import {
  DiaryEntryFormComponent
} from '../diary-entry-form/diary-entry-form.component';

import {
  ImageModalComponent
} from '../../image/image-modal/image-modal.component';

import {
  MockImageDirective, asyncData, asyncError
} from '../../shared/test-utils';


registerLocaleData(localeDe);


/**
 * Mock authentication directive
 */
@Directive({
  selector: '[appAuth]'
})
class MockAuthDirective {}


describe('DiaryEntryCardComponent', () => {
  let component: DiaryEntryCardComponent;
  let fixture: ComponentFixture<DiaryEntryCardComponent>;

  const testDiaryEntry: DiaryEntry = {
    _id: '0',
    title: 'some title',
    locationName: 'some location',
    body: 'some body',
    images: [],
    tags: [],
    createdAt: (new Date()).toISOString(),
    updatedAt: (new Date()).toISOString()
  };

  beforeEach(async () => {
    const modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

    const mockModal: Partial<NgbModalRef> = {
      componentInstance: {}
    };

    const diaryServiceSpy = jasmine.createSpyObj(
        'DiaryEntryService', ['deleteEntry']);

    await TestBed.configureTestingModule({
      declarations: [
        DiaryEntryCardComponent,
        DiaryEntryBriefPipe,
        MockAuthDirective,
        MockImageDirective
      ],
      providers: [
        {provide: NgbModal, useValue: modalServiceSpy},
        {provide: NgbModalRef, useValue: mockModal},
        {provide: DiaryEntryService, useValue: diaryServiceSpy},
        {provide: LOCALE_ID, useValue: 'de'}
      ],
      imports: [
        NgbAlertModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryCardComponent);
    component = fixture.componentInstance;
    component.diaryEntry = {...testDiaryEntry};
    fixture.detectChanges();
  });

  it('should not render diary entry\'s first image', () => {
    const cardImage = fixture.debugElement.query(By.css('.card-img-top'));
    expect(cardImage).toBeNull();
  });

  it('should render diary entry\'s first image', () => {
    component.diaryEntry.images = [{
      _id: '0',
      description: 'some description',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    }];

    fixture.detectChanges();
    const cardImage = fixture.debugElement.query(By.css('.card-img-top'));
    expect(cardImage).not.toBeNull();
  });

  it('should render diary entry\'s title', () => {
    const cardTitle = fixture.debugElement.query(By.css('.card-title'));
    expect(cardTitle.nativeElement.textContent).toMatch(testDiaryEntry.title);
  });

  it('should render diary entry\'s location name', () => {
    const cardSubtitle = fixture.debugElement.query(By.css('.card-subtitle'));

    expect(cardSubtitle.nativeElement.textContent).toMatch(
        testDiaryEntry.locationName);
  });

  it('should render diary entry\'s brief body', () => {
    const cardText = fixture.debugElement.queryAll(
        By.css('.card-body .card-text'))[0];

    expect(cardText.nativeElement.textContent).toMatch(
        (new DiaryEntryBriefPipe()).transform(testDiaryEntry, 150));
  });

  it('should render diary entry\'s creation date', () => {
    const cardText = fixture.debugElement.queryAll(
        By.css('.card-body .card-text'))[1];

    expect(cardText.nativeElement.textContent).toContain(
        formatDate(testDiaryEntry.createdAt, 'mediumDate', 'de'));
  });

  it('should not render empty alert message', () => {
    const alert = fixture.debugElement.query(By.css('ngb-alert'));
    expect(alert).toBeNull();
  });

  it('should render alert message', () => {
    const alertMessage = 'This is a mock alert message';

    component.alertMessage = alertMessage;
    fixture.detectChanges();

    const alert = fixture.debugElement.query(By.css('ngb-alert'));
    expect(alert.nativeElement.textContent).toMatch(alertMessage);
  });

  it('#openEntryModal should open diary entry modal component', () => {
    const service = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;

    const modal: NgbModalRef = TestBed.inject(NgbModalRef);
    service.open.and.returnValue(modal);

    component.openEntryModal();

    expect(modal.componentInstance.diaryEntry).toEqual(testDiaryEntry);
    expect(service.open).toHaveBeenCalledWith(DiaryEntryModalComponent);
  });

  it('read more button should trigger #openEntryModal', () => {
    spyOn(component, 'openEntryModal');

    const readMoreButton = fixture.debugElement.query(
        By.css('.card-body .btn-primary'));

    readMoreButton.triggerEventHandler('click', null);
    expect(component.openEntryModal).toHaveBeenCalled();
  });

  it('#openUpdateEntryModal should open diary entry form component', () => {
    const service = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;

    const modal: NgbModalRef = TestBed.inject(NgbModalRef);
    service.open.and.returnValue(modal);

    component.openUpdateEntryModal();

    expect(modal.componentInstance.modalTitle).toMatch(
        'Bearbeite Tagebucheintrag');

    expect(modal.componentInstance.diaryEntry).toEqual(
        testDiaryEntry);

    expect(service.open).toHaveBeenCalledWith(
        DiaryEntryFormComponent, {backdrop: 'static', keyboard: false});
  });

  it('edit button should trigger #openUpdateEntryModal', () => {
    spyOn(component, 'openUpdateEntryModal');

    const editButton = fixture.debugElement.query(
        By.css('.card-header .btn-primary'));

    editButton.triggerEventHandler('click', null);
    expect(component.openUpdateEntryModal).toHaveBeenCalled();
  });

  it('#openImageModal should open image modal component', () => {
    const service = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;

    const modal: NgbModalRef = TestBed.inject(NgbModalRef);
    service.open.and.returnValue(modal);

    component.openImageModal();

    expect(modal.componentInstance.diaryEntry).toEqual(testDiaryEntry);

    expect(service.open).toHaveBeenCalledWith(
        ImageModalComponent, {backdrop: 'static', keyboard: false});
  });

  it('image button should trigger #openImageModal', () => {
    spyOn(component, 'openImageModal');

    const imageButton = fixture.debugElement.query(
        By.css('.card-header .btn-secondary'));

    imageButton.triggerEventHandler('click', null);
    expect(component.openImageModal).toHaveBeenCalled();
  });

  it('#deleteEntry should emit deleted entry', waitForAsync(() => {
    component.alertMessage = 'This is mock alert message.';

    const service = TestBed.inject(DiaryEntryService) as
        jasmine.SpyObj<DiaryEntryService>;

    service.deleteEntry.and.returnValue(asyncData(testDiaryEntry));

    let deletedEntryId = '';

    component.deletedEntryId.subscribe((entryId: string) => {
      deletedEntryId = entryId;
    });

    component.deleteEntry();

    expect(component.showSpinner).toBeTrue();
    expect(component.alertMessage).toEqual('');

    fixture.whenStable().then(() => {
      expect(deletedEntryId).toEqual(testDiaryEntry._id);
      expect(component.showSpinner).toBeFalse();
      expect(service.deleteEntry).toHaveBeenCalledWith(testDiaryEntry._id);
    });
  }));

  it('#deleteEntry should set alert message', waitForAsync(() => {
    const service = TestBed.inject(DiaryEntryService) as
        jasmine.SpyObj<DiaryEntryService>;

    const alertMessage = 'This is a mock error observable.';
    service.deleteEntry.and.returnValue(asyncError(alertMessage));

    component.deleteEntry();

    fixture.whenStable().then(() => {
      expect(component.alertMessage).toEqual(alertMessage);
      expect(component.showSpinner).toBeFalse();
      expect(service.deleteEntry).toHaveBeenCalledWith(testDiaryEntry._id);
    });
  }));

  it('delete button should trigger #deletedEntry', () => {
    spyOn(component, 'deleteEntry');

    const deleteButton = fixture.debugElement.query(
        By.css('.card-header .btn-danger'));

    deleteButton.triggerEventHandler('click', null);
    expect(component.deleteEntry).toHaveBeenCalled();
  });

  it('should not render spinner', () => {
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).toBeNull();
  });

  it('should render spinner', () => {
    component.showSpinner = true;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).not.toBeNull();
  });

  it('edit button should be disabled when spinner is active', () => {
    component.showSpinner = true;
    fixture.detectChanges();

    const editButton = fixture.debugElement.query(
        By.css('.card-header .btn-primary'));

    expect(editButton.nativeElement.disabled).toBeTrue();
  });

  it('image button should be disabled when spinner is active', () => {
    component.showSpinner = true;
    fixture.detectChanges();

    const imageButton = fixture.debugElement.query(
        By.css('.card-header .btn-secondary'));

    expect(imageButton.nativeElement.disabled).toBeTrue();
  });

  it('delete button should be hidden when spinner is active', () => {
    component.showSpinner = true;
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(
        By.css('.card-header .btn-danger'));

    expect(deleteButton.nativeElement.hidden).toBeTrue();
  });

  it('read more button should be disabled when spinner is active', () => {
    component.showSpinner = true;
    fixture.detectChanges();

    const readMoreButton = fixture.debugElement.query(
        By.css('.card-body .btn-primary'));

    expect(readMoreButton.nativeElement.disabled).toBeTrue();
  });
});
