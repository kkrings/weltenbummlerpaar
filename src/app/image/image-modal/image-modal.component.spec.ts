/**
 * Unit tests for image modal component
 * @packageDocumentation
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ImageModalComponent } from './image-modal.component';
import { Image } from '../image.model';

import {
  MockNgbActiveModal,
  TestUtilsModule,
} from '../../test-utils/test-utils.module';

/**
 * Mock image upload component
 */
@Component({
  selector: 'app-image-upload',
})
class MockImageUploadComponent {
  /**
   * Mock injected ID of diary entry the image modal is attached to
   */
  @Input() entryId = '';

  /**
   * Mock created/updated image (two-way data binding)
   */
  @Input() image: Image = {
    id: '',
    description: '',
    createdAt: '',
    updatedAt: '',
  };

  /**
   * Mock created/updated image (two-way data binding)
   */
  @Output() imageChange = new EventEmitter<Image>();

  /**
   * Mock deleted image
   */
  @Output() imageDelete = new EventEmitter<Image>();

  /**
   * Mock back-end server's processing status
   */
  @Output() processing = new EventEmitter<boolean>();
}

describe('ImageModalComponent', () => {
  let component: ImageModalComponent;
  let fixture: ComponentFixture<ImageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestUtilsModule],
      declarations: [ImageModalComponent, MockImageUploadComponent],
      providers: [{ provide: NgbActiveModal, useClass: MockNgbActiveModal }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageModalComponent);

    component = fixture.componentInstance;

    component.diaryEntry = {
      id: '0',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      images: [
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
      ],
      searchTags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    component.disableClose = false;

    fixture.detectChanges();
  });

  it('#close should close the modal', () => {
    const modal: NgbActiveModal = TestBed.inject(NgbActiveModal);
    spyOn(modal, 'close');
    component.close();
    expect(modal.close).toHaveBeenCalled();
  });

  it("close button in modal's header should trigger #close", () => {
    const closeButton = fixture.debugElement.query(
      By.css('.modal-header button')
    );
    spyOn(component, 'close');
    closeButton.triggerEventHandler('click', null);
    expect(component.close).toHaveBeenCalled();
  });

  it("close button in modal's footer should trigger #close", () => {
    const closeButton = fixture.debugElement.query(
      By.css('.modal-footer button')
    );
    spyOn(component, 'close');
    closeButton.triggerEventHandler('click', null);
    expect(component.close).toHaveBeenCalled();
  });

  it("#disableClose should disable close button in modal's header", () => {
    component.disableClose = true;
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(
      By.css('.modal-header button')
    );
    expect(closeButton.nativeElement.disabled).toBeTrue();
  });

  it("#disableClose should disable close button in modal's footer", () => {
    component.disableClose = true;
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(
      By.css('.modal-footer button')
    );
    expect(closeButton.nativeElement.disabled).toBeTrue();
  });

  it('should render images', () => {
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images.length).toEqual(component.diaryEntry.images.length);
  });

  it('should render image uploads', () => {
    const imageUploads = fixture.debugElement.queryAll(
      By.directive(MockImageUploadComponent)
    );
    expect(imageUploads.length).toEqual(component.diaryEntry.images.length + 1);
  });

  it('ID of #diaryEntry should be injected into image uploads', () => {
    const imageUploads = fixture.debugElement.queryAll(
      By.directive(MockImageUploadComponent)
    );

    for (const imageUpload of imageUploads) {
      const imageUploadComponent = imageUpload.injector.get(
        MockImageUploadComponent
      );
      expect(imageUploadComponent.entryId).toEqual(component.diaryEntry.id);
    }
  });

  it('image uploads should set #disableClose to true', () => {
    const imageUploads = fixture.debugElement.queryAll(
      By.directive(MockImageUploadComponent)
    );

    for (const imageUpload of imageUploads) {
      const imageUploadComponent = imageUpload.injector.get(
        MockImageUploadComponent
      );
      imageUploadComponent.processing.emit(true);
      fixture.detectChanges();
      expect(component.disableClose).toBeTrue();
    }
  });

  it('first image upload should add image to #diaryEntry', () => {
    const imageUpload = fixture.debugElement.queryAll(
      By.directive(MockImageUploadComponent)
    )[0];
    const imageUploadComponent = imageUpload.injector.get(
      MockImageUploadComponent
    );

    const uploadedImage: Image = {
      id: '2',
      description: 'some description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    imageUploadComponent.imageChange.emit(uploadedImage);
    fixture.detectChanges();

    const lastIndex = component.diaryEntry.images.length - 1;
    expect(component.diaryEntry.images[lastIndex]).toEqual(uploadedImage);
  });

  it('other image uploads should change images', () => {
    const imageUploads = fixture.debugElement.queryAll(
      By.directive(MockImageUploadComponent)
    );

    imageUploads.shift();

    imageUploads.forEach((imageUpload, imageIndex) => {
      const imageUploadComponent = imageUpload.injector.get(
        MockImageUploadComponent
      );

      const changedImage = imageUploadComponent.image;

      changedImage.description = 'some changed description';
      imageUploadComponent.imageChange.emit(changedImage);
      fixture.detectChanges();

      expect(component.diaryEntry.images[imageIndex]).toEqual(changedImage);
    });
  });

  it('other image uploads should delete images', () => {
    const imageUploads = fixture.debugElement.queryAll(
      By.directive(MockImageUploadComponent)
    );

    imageUploads.shift();

    for (const imageUpload of imageUploads) {
      const imageUploadComponent = imageUpload.injector.get(
        MockImageUploadComponent
      );

      const deletedImage = imageUploadComponent.image;

      imageUploadComponent.imageDelete.emit(deletedImage);
      fixture.detectChanges();

      const imageIds = component.diaryEntry.images.map((image) => image.id);
      expect(imageIds).not.toContain(deletedImage.id);
    }
  });
});
