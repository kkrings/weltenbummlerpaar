/**
 * Unit tests for image upload component
 * @packageDocumentation
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { defer } from 'rxjs';
import { first, last } from 'rxjs/operators';

import { ImageUploadComponent } from './image-upload.component';
import { ImageService } from '../image.service';
import { Image } from '../image.model';


/**
 * Data observable
 *
 * Create an observable that emits the given data once and completes after a JS
 * engine turn.
 *
 * @typeParam T
 *   Data's type
 * @param data
 *   Data
 *
 * @returns
 *   Data observable
 */
function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

/**
 * Error observale
 *
 * Create an observable that emit the given error once and completes after a JS
 * engine turn.
 *
 * @typeParam T
 *   Error's type
 * @param error
 *   Error
 *
 * @returns
 *   Error observable
 */
function asyncError<T>(error: T) {
  return defer(() => Promise.reject(error));
}


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
    const testImage: Image = {
      _id: '0',
      description: 'some description',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    component.image = testImage;

    const imageService = TestBed.inject(ImageService) as
        jasmine.SpyObj<ImageService>;

    const alertMessage = 'This is a mock alert message.';

    imageService.deleteImage.and.returnValue(asyncError(alertMessage));

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
      expect(component.alertMessage).toEqual(alertMessage);
    });
  }));
});
