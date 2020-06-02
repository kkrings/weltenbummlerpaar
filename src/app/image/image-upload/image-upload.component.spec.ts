/**
 * Unit tests for image upload component
 * @packageDocumentation
 */

import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { first, last } from 'rxjs/operators';

import { ImageUploadComponent } from './image-upload.component';
import { ImageService } from '../image.service';
import { Image } from '../image.model';

import { asyncData, asyncError } from '../../shared/test-utils';


describe('ImageUploadComponent', () => {
  let component: ImageUploadComponent;
  let fixture: ComponentFixture<ImageUploadComponent>;

  const testEntryId = '0';

  beforeEach(async(() => {
    const imageServiceSpy = jasmine.createSpyObj('ImageService', [
      'uploadImage',
      'updateImage',
      'deleteImage',
      'compressImage'
    ]);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgbAlertModule
      ],
      declarations: [
        ImageUploadComponent
      ],
      providers: [
        {provide: ImageService, useValue: imageServiceSpy}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadComponent);
    component = fixture.componentInstance;
    component.entryId = testEntryId;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('files form control should be empty', () => {
    const filesInput = fixture.debugElement.query(By.css('#files'));
    expect(filesInput.nativeElement.files.length).toEqual(0);
  });

  it('files form control should be required', () => {
    const errors = component.files.errors;
    expect(errors !== null && errors.required).toBeTrue();
    const filesInput = fixture.debugElement.query(By.css('#files'));
    expect(filesInput.nativeElement.required).toBeTrue();
  });

  it('files form control should not be required', () => {
    component.image._id = '0';
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.files.errors).toBeNull();
    const filesInput = fixture.debugElement.query(By.css('#files'));
    expect(filesInput.nativeElement.required).toBeFalse();
  });

  it('#files.value should match selected file', () => {
    const testFile = new File([], 'test.jpg', {type: 'image/jpeg'});

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(testFile);

    const filesInput = fixture.debugElement.query(By.css('#files'));
    filesInput.nativeElement.files = dataTransfer.files;
    filesInput.nativeElement.dispatchEvent(new Event('input'));

    expect(component.files.value).toEqual('C:\\fakepath\\' + testFile.name);
  });

  it('description form control should be empty', () => {
    const description = fixture.debugElement.query(By.css('#description'));
    expect(description.nativeElement.value).toEqual('');
  });

  it('description form control should show #image.description', () => {
    const testDescription = 'some description';
    component.image.description = testDescription;
    component.ngOnInit();
    fixture.detectChanges();
    const description = fixture.debugElement.query(By.css('#description'));
    expect(description.nativeElement.value).toEqual(testDescription);
  });

  it('#description.value should match entered description', () => {
    const testDescription = 'some description';
    const description = fixture.debugElement.query(By.css('#description'));
    description.nativeElement.value = testDescription;
    description.nativeElement.dispatchEvent(new Event('input'));
    expect(component.description.value).toEqual(testDescription);
  });

  it('should not render description\'s validation error', () => {
    const error = fixture.debugElement.query(By.css('#description + div'));
    expect(error).toBeNull();
  });

  it('should not render description\'s validation error', () => {
    const description = fixture.debugElement.query(By.css('#description'));
    description.nativeElement.value = 'some description';
    description.nativeElement.dispatchEvent(new Event('input'));
    const error = fixture.debugElement.query(By.css('#description + div'));
    expect(error).toBeNull();
  });

  it('should render description\'s validation error', () => {
    component.description.markAsTouched();
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('#description + div'));
    expect(error).not.toBeNull();
  });

  it('should render description\'s validation error', () => {
    component.description.markAsDirty();
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('#description + div'));
    expect(error).not.toBeNull();
  });

  it('#deleteImage should delete image', async(() => {
    component.alertMessage = 'This is a mock alert message';

    const testImage: Image = {
      _id: '0',
      description: 'some description',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    component.image = testImage;

    const imageService = TestBed.inject(ImageService) as
        jasmine.SpyObj<ImageService>;

    imageService.deleteImage.and.returnValue(asyncData(testImage));

    component.imageDelete.subscribe((image: Image) => {
      expect(image._id).toEqual(testImage._id);
    });

    component.processing.pipe(first()).subscribe((processing: boolean) => {
      expect(processing).toBeTrue();
    });

    component.processing.pipe(last()).subscribe((processing: boolean) => {
      expect(processing).toBeFalse();
    });

    component.deleteImage();

    expect(component.processDeleteRequest).toBeTrue();
    expect(component.alertMessage).toEqual('');

    expect(imageService.deleteImage).toHaveBeenCalledWith(
        testEntryId, testImage._id);

    fixture.whenStable().then(() => {
      expect(component.processDeleteRequest).toBeFalse();
    });
  }));

  it('#deleteImage should set alert message', async(() => {
    component.image._id = '0';

    const imageService = TestBed.inject(ImageService) as
        jasmine.SpyObj<ImageService>;

    const alertMessage = 'This is a mock alert message.';
    imageService.deleteImage.and.returnValue(asyncError(alertMessage));

    component.processing.pipe(last()).subscribe((processing: boolean) => {
      expect(processing).toBeFalse();
    });

    component.deleteImage();

    fixture.whenStable().then(() => {
      expect(component.processDeleteRequest).toBeFalse();
      expect(component.alertMessage).toEqual(alertMessage);
    });
  }));

  it('delete button should only be rendered when updating image', () => {
    const buttonQuery = By.css('button.btn.btn-danger.btn-sm');

    let button = fixture.debugElement.query(buttonQuery);
    expect(button).toBeNull();

    component.image._id = '0';
    fixture.detectChanges();

    button = fixture.debugElement.query(buttonQuery);
    expect(button).not.toBeNull();
  });

  it('delete button should call #deleteImage', () => {
    component.image._id = '0';
    fixture.detectChanges();

    spyOn(component, 'deleteImage');

    const button = fixture.debugElement.query(
        By.css('button.btn.btn-danger.btn-sm'));

    button.triggerEventHandler('click', null);
    expect(component.deleteImage).toHaveBeenCalled();
  });

  it('delete button should be disabled when uploading image', () => {
    component.image._id = '0';
    component.processUploadRequest = true;

    fixture.detectChanges();

    const button = fixture.debugElement.query(
        By.css('button.btn.btn-danger.btn-sm'));

    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('delete button should be hidden when deleting image', () => {
    component.image._id = '0';
    component.processDeleteRequest = true;

    fixture.detectChanges();

    const button = fixture.debugElement.query(
        By.css('button.btn.btn-danger.btn-sm'));

    expect(button.nativeElement.hidden).toBeTrue();
  });

  it('should not render delete spinner', () => {
    component.image._id = '0';

    fixture.detectChanges();

    const spinner = fixture.debugElement.query(
        By.css('div.spinner-border.text-danger'));

    expect(spinner).toBeNull();
  });

  it('should render delete spinner', () => {
    component.image._id = '0';
    component.processDeleteRequest = true;

    fixture.detectChanges();

    const spinner = fixture.debugElement.query(
        By.css('div.spinner-border.text-danger'));

    expect(spinner).not.toBeNull();
  });

  it('#onSubmit should upload image', async(() => {
    component.alertMessage = 'This is a mock alert message';

    const testImage: Image = {
      _id: '0',
      description: 'some description',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    const description = fixture.debugElement.query(By.css('#description'));
    description.nativeElement.value = testImage.description;
    description.nativeElement.dispatchEvent(new Event('input'));

    const testFile = new File([], 'testImage.jpg', {type: 'image/jpeg'});
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(testFile);

    const filesInput = fixture.debugElement.query(By.css('#files'));
    filesInput.nativeElement.files = dataTransfer.files;
    filesInput.nativeElement.dispatchEvent(new Event('input'));

    const imageService = TestBed.inject(ImageService) as
        jasmine.SpyObj<ImageService>;

    imageService.compressImage.and.returnValue(of(testFile));
    imageService.uploadImage.and.returnValue(asyncData(testImage));

    component.imageChange.subscribe((image: Image) => {
      expect(image._id).toEqual(testImage._id);
    });

    component.processing.pipe(first()).subscribe((processing: boolean) => {
      expect(processing).toBeTrue();
    });

    component.processing.pipe(last()).subscribe((processing: boolean) => {
      expect(processing).toBeFalse();
    });

    component.onSubmit();

    expect(component.alertMessage).toEqual('');
    expect(component.processUploadRequest).toBeTrue();
    expect(component.image.description).toEqual(testImage.description);

    expect(imageService.compressImage).toHaveBeenCalled();

    expect(imageService.uploadImage).toHaveBeenCalledWith(
        component.entryId, component.image);

    fixture.whenStable().then(() => {
      expect(component.image.file).toEqual(testFile);
      expect(component.processUploadRequest).toBeFalse();
    });
  }));

  it('#onSubmit should update image', () => {
    component.image._id = '0';

    const imageService = TestBed.inject(ImageService) as
        jasmine.SpyObj<ImageService>;

    imageService.updateImage.and.returnValue(of(component.image));

    component.onSubmit();
    expect(imageService.updateImage).toHaveBeenCalledWith(component.image);
  });

  it('#onSubmit should set alert message', async(() => {
    component.image._id = '0';

    const imageService = TestBed.inject(ImageService) as
        jasmine.SpyObj<ImageService>;

    const alertMessage = 'This is a mock alert message.';
    imageService.updateImage.and.returnValue(asyncError(alertMessage));

    component.processing.pipe(last()).subscribe((processing: boolean) => {
      expect(processing).toBeFalse();
    });

    component.onSubmit();

    fixture.whenStable().then(() => {
      expect(component.processUploadRequest).toBeFalse();
      expect(component.alertMessage).toEqual(alertMessage);
    });
  }));

  it('submit button should be disabled', () => {
    const button = fixture.debugElement.query(
        By.css('button.btn.btn-primary.btn-sm'));

    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('submit button should not be disabled', () => {
    component.image._id = '0';
    component.image.description = 'some description';
    component.ngOnInit();

    fixture.detectChanges();

    const button = fixture.debugElement.query(
        By.css('button.btn.btn-primary.btn-sm'));

    expect(button.nativeElement.disabled).toBeFalse();
  });

  it('submit button should be disabled when deleting image', () => {
    component.image._id = '0';
    component.image.description = 'some description';
    component.processDeleteRequest = true;
    component.ngOnInit();

    fixture.detectChanges();

    const button = fixture.debugElement.query(
        By.css('button.btn.btn-primary.btn-sm'));

    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('submit button should be hidden when uploading image', () => {
    component.image._id = '0';
    component.image.description = 'some description';
    component.processUploadRequest = true;
    component.ngOnInit();

    fixture.detectChanges();

    const button = fixture.debugElement.query(
        By.css('button.btn.btn-primary.btn-sm'));

    expect(button.nativeElement.hidden).toBeTrue();
  });

  it('should not render upload spinner', () => {
    const spinner = fixture.debugElement.query(
        By.css('div.spinner-border.text-primary'));

    expect(spinner).toBeNull();
  });

  it('should render upload spinner', () => {
    component.processUploadRequest = true;

    fixture.detectChanges();

    const spinner = fixture.debugElement.query(
        By.css('div.spinner-border.text-primary'));

    expect(spinner).not.toBeNull();
  });

  it('should not render empty alert message', () => {
    const ngbAlert = fixture.debugElement.query(By.css('ngb-alert'));
    expect(ngbAlert).toBeNull();
  });

  it('should render alert message', () => {
    const alertMessage = 'This is a mock alert message';
    component.alertMessage = alertMessage;
    fixture.detectChanges();
    const ngbAlert = fixture.debugElement.query(By.css('ngb-alert'));
    expect(ngbAlert.nativeElement.textContent).toMatch(alertMessage);
  });
});
