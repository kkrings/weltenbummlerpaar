/**
 * Unit tests for diary entry form component
 * @packageDocumentation
 */

import { Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbAlertModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';

import { DiaryEntryFormComponent } from './diary-entry-form.component';
import { DiaryEntryService } from '../diary-entry.service';
import { DIARY_ENTRIES } from '../diary-entries';


/**
 * Mock active modal
 */
class MockNgbActiveModal {
  /**
   * Mock the close the active modal's close method.
   */
  close(): void { }
}

/**
 * Mock image directive
 */
@Directive({
  selector: '[appImage]'
})
class MockImageDirective {
  /**
   * Mock image
   */
  @Input('appImage') mockImage = null;
}


describe('DiaryEntryFormComponent', () => {
  let component: DiaryEntryFormComponent;
  let fixture: ComponentFixture<DiaryEntryFormComponent>;

  const testEntry = DIARY_ENTRIES[0];

  beforeEach(async(() => {
    const diaryEntryServiceSpy = jasmine.createSpyObj(
      'DiaryEntryService', ['saveEntry', 'updateEntry']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgbAlertModule
      ],
      declarations: [
        DiaryEntryFormComponent,
        MockImageDirective
      ],
      providers: [
        {provide: DiaryEntryService, useValue: diaryEntryServiceSpy},
        {provide: NgbActiveModal, useClass: MockNgbActiveModal}
      ]
    }).compileComponents();
  }));

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

  it('should not initially render spinner', () => {
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).toBeNull();
  });

  it('should render spinner', () => {
    component.processRequest = true;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).not.toBeNull();
  });

  it('header\'s dismiss button should be disabled when spinner is active',
      () => {
        component.processRequest = true;
        fixture.detectChanges();

        const closeButton = fixture.debugElement.query(
            By.css('.modal-header button.close'));

        expect(closeButton.nativeElement.disabled).toBeTrue();
      });

  it('footer\'s abort button should be disabled when spinner is active',
      () => {
        component.processRequest = true;
        fixture.detectChanges();

        const abortButton = fixture.debugElement.query(
            By.css('.modal-footer button.btn.btn-danger'));

        expect(abortButton.nativeElement.disabled).toBeTrue();
      });

  it('footer\'s submit button should be hidden when spinner is active',
      () => {
        component.processRequest = true;
        fixture.detectChanges();

        const submitButton = fixture.debugElement.query(
            By.css('.modal-footer button.btn.btn-primary'));

        expect(submitButton.nativeElement.hidden).toBeTrue();
      });

  it('#closeModal should close modal', () => {
    const modal: NgbActiveModal = TestBed.inject(NgbActiveModal);
    spyOn(modal, 'close');
    component.closeModal();
    expect(modal.close).toHaveBeenCalled();
  });

  it('header\'s dismiss button should trigger #closeModal', () => {
    const closeButton = fixture.debugElement.query(
        By.css('.modal-header button.close'));

    spyOn(component, 'closeModal');
    closeButton.triggerEventHandler('click', null);
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('footer\'s abort button should trigger #closeModal', () => {
    const abortButton = fixture.debugElement.query(
        By.css('.modal-footer button.btn.btn-danger'));

    spyOn(component, 'closeModal');
    abortButton.triggerEventHandler('click', null);
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('value of form control title should be empty', () => {
    const titleInput = fixture.debugElement.query(By.css('#title'));
    expect(titleInput.nativeElement.value).toEqual('');
  });

  it('#title.value should match entered title', () => {
    const testTitle = 'Some title';
    const titleInput = fixture.debugElement.query(By.css('#title'));
    titleInput.nativeElement.value = testTitle;
    titleInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.title.value).toEqual(testTitle);
  });

  it('value of form control title should match diary entry\'s title', () => {
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

  it('should render title\'s validation error when invalid and touched',
      () => {
        component.title.markAsTouched();
        fixture.detectChanges();

        const errorMessage = fixture.debugElement.query(
            By.css('#title + div'));

        expect(errorMessage).not.toBeNull();
      });

  it('should render title\'s validation error when invalid and dirty', () => {
    component.title.markAsDirty();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#title + div'));
    expect(errorMessage).not.toBeNull();
  });

  it('value of form control location should be empty', () => {
    const locationInput = fixture.debugElement.query(By.css('#location'));
    expect(locationInput.nativeElement.value).toEqual('');
  });

  it('value of form control location should match diary entry\'s location',
      () => {
        component.diaryEntry = testEntry;
        component.ngOnInit();
        fixture.detectChanges();

        const locationInput = fixture.debugElement.query(By.css('#location'));

        expect(locationInput.nativeElement.value).toEqual(
            testEntry.locationName);
      });

  it('#location.value should match location entered by user', () => {
    const testLocation = 'Some location';
    const locationInput = fixture.debugElement.query(By.css('#location'));
    locationInput.nativeElement.value = testLocation;
    locationInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.locationName.value).toEqual(testLocation);
  });

  it('should not render location\'s validation error', () => {
    const errorMessage = fixture.debugElement.query(By.css('#location + div'));
    expect(errorMessage).toBeNull();
  });

  it('should not render location\'s validation error when valid', () => {
    const locationInput = fixture.debugElement.query(By.css('#location'));
    locationInput.nativeElement.value = testEntry.locationName;
    locationInput.nativeElement.dispatchEvent(new Event('input'));
    const errorMessage = fixture.debugElement.query(By.css('#location + div'));
    expect(errorMessage).toBeNull();
  });

  it('should render location\'s validation error when invalid and touched',
      () => {
        component.locationName.markAsTouched();
        fixture.detectChanges();

        const errorMessage = fixture.debugElement.query(
            By.css('#location + div'));

        expect(errorMessage).not.toBeNull();
      });

  it('should render location\'s validation error when invalid and dirty',
      () => {
        component.locationName.markAsDirty();
        fixture.detectChanges();

        const errorMessage = fixture.debugElement.query(
            By.css('#location + div'));

        expect(errorMessage).not.toBeNull();
  });

  it('value of form control body should be empty', () => {
    const bodyInput = fixture.debugElement.query(By.css('#body'));
    expect(bodyInput.nativeElement.value).toEqual('');
  });

  it('value of form control body should match diary entry\'s body', () => {
    component.diaryEntry = testEntry;
    component.ngOnInit();
    fixture.detectChanges();
    const bodyInput = fixture.debugElement.query(By.css('#body'));
    expect(bodyInput.nativeElement.value).toEqual(testEntry.body);
  });

  it('#body.value should match body entered by user', () => {
    const testBody = 'Some body';
    const bodyInput = fixture.debugElement.query(By.css('#body'));
    bodyInput.nativeElement.value = testBody;
    bodyInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.body.value).toEqual(testBody);
  });

  it('should not render body\'s validation error', () => {
    const errorMessage = fixture.debugElement.query(By.css('#body + div'));
    expect(errorMessage).toBeNull();
  });

  it('should not render body\'s validation error when valid', () => {
    const bodyInput = fixture.debugElement.query(By.css('#body'));
    bodyInput.nativeElement.value = testEntry.locationName;
    bodyInput.nativeElement.dispatchEvent(new Event('input'));
    const errorMessage = fixture.debugElement.query(By.css('#body + div'));
    expect(errorMessage).toBeNull();
  });

  it('should render body\'s validation error when invalid and touched', () => {
    component.body.markAsTouched();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#body + div'));
    expect(errorMessage).not.toBeNull();
  });

  it('should render body\'s validation error when invalid and dirty', () => {
    component.body.markAsDirty();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#body + div'));
    expect(errorMessage).not.toBeNull();
  });

  it('#tags.value should match tags entered by user', () => {
    const testTags = 'Some tag, some other tag';
    const tagsInput = fixture.debugElement.query(By.css('#tags'));
    tagsInput.nativeElement.value = testTags;
    tagsInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.tags.value).toEqual(testTags);
  });

  it('value of form control tags should be empty', () => {
    const tagsInput = fixture.debugElement.query(By.css('#tags'));
    expect(tagsInput.nativeElement.value).toEqual('');
  });

  it('value of form control tags should match diary entry\'s tags', () => {
    component.diaryEntry = testEntry;
    component.ngOnInit();
    fixture.detectChanges();
    const tagsInput = fixture.debugElement.query(By.css('#tags'));
    expect(tagsInput.nativeElement.value).toEqual(testEntry.tags.join(', '));
  });

  it('#moveImageDown should move image down in image list', () => {
    component.imageList = testEntry.images;
    const testImage = component.imageList[0];
    component.moveImageDown(0);
    expect(component.imageList.indexOf(testImage)).toEqual(1);
  });

  it('#moveImageDown should wrap around last entry in image list', () => {
    component.imageList = testEntry.images;
    const testIndex = component.imageList.length - 1;
    const testImage = component.imageList[testIndex];
    component.moveImageDown(testIndex);
    expect(component.imageList.indexOf(testImage)).toEqual(0);
  });

  it('#moveImageUp should move image up in image list', () => {
    component.imageList = testEntry.images;
    const testImage = component.imageList[1];
    component.moveImageUp(1);
    expect(component.imageList.indexOf(testImage)).toEqual(0);
  });

  it('#moveImageUp should wrap around first entry in image list', () => {
    component.imageList = testEntry.images;

    const testImage = component.imageList[0];
    component.moveImageUp(0);

    expect(component.imageList.indexOf(testImage)).toEqual(
        component.imageList.length - 1);
  });

  it('#onSubmit should create new diary entry', () => {
    const diaryEntry = {...component.diaryEntry};

    diaryEntry.title = testEntry.title;
    const titleInput = fixture.debugElement.query(By.css('#title'));
    titleInput.nativeElement.value = testEntry.title;
    titleInput.nativeElement.dispatchEvent(new Event('input'));

    diaryEntry.locationName = testEntry.locationName;
    const locationInput = fixture.debugElement.query(By.css('#location'));
    locationInput.nativeElement.value = testEntry.locationName;
    locationInput.nativeElement.dispatchEvent(new Event('input'));

    diaryEntry.body = testEntry.body;
    const bodyInput = fixture.debugElement.query(By.css('#body'));
    bodyInput.nativeElement.value = testEntry.body;
    bodyInput.nativeElement.dispatchEvent(new Event('input'));

    diaryEntry.tags = testEntry.tags;
    const tagsInput = fixture.debugElement.query(By.css('#tags'));
    tagsInput.nativeElement.value = testEntry.tags.join(', ');
    tagsInput.nativeElement.dispatchEvent(new Event('input'));

    const service = TestBed.inject(DiaryEntryService) as
        jasmine.SpyObj<DiaryEntryService>;

    service.saveEntry.and.returnValue(of(testEntry));

    const modal: NgbActiveModal = TestBed.inject(NgbActiveModal);
    spyOn(modal, 'close');

    component.onSubmit();

    expect(service.saveEntry).toHaveBeenCalledWith(diaryEntry);
    expect(component.diaryEntry).toEqual(testEntry);
    expect(modal.close).toHaveBeenCalledWith(testEntry);
  });

  it('#onSubmit should update injected diary entry', () => {
    component.diaryEntry = {...testEntry};
    component.ngOnInit();

    fixture.detectChanges();

    const updatedEntry = {...testEntry};
    updatedEntry.title = 'updated title';

    const titleInput = fixture.debugElement.query(By.css('#title'));
    titleInput.nativeElement.value = updatedEntry.title;
    titleInput.nativeElement.dispatchEvent(new Event('input'));

    const service = TestBed.inject(DiaryEntryService) as
        jasmine.SpyObj<DiaryEntryService>;

    service.updateEntry.and.returnValue(of(updatedEntry));

    component.onSubmit();

    expect(service.updateEntry).toHaveBeenCalledWith(updatedEntry);
    expect(component.diaryEntry).toEqual(updatedEntry);
  });

  it('#onSubmit should reset alert message', () => {
    const service = TestBed.inject(DiaryEntryService) as
        jasmine.SpyObj<DiaryEntryService>;

    service.saveEntry.and.returnValue(of(testEntry));

    component.alertMessage = 'This is mock alert message.';
    component.onSubmit();

    expect(component.alertMessage).toEqual('');
  });

  it('#onSubmit should set alert message', () => {
    component.diaryEntry = {...testEntry};
    component.ngOnInit();

    fixture.detectChanges();

    const service = TestBed.inject(DiaryEntryService) as
        jasmine.SpyObj<DiaryEntryService>;

    const alertMessage = 'This is a mock error observable.';
    service.updateEntry.and.returnValue(throwError(alertMessage));

    component.onSubmit();

    expect(service.updateEntry).toHaveBeenCalledWith(testEntry);
    expect(component.alertMessage).toEqual(alertMessage);
  });
});
