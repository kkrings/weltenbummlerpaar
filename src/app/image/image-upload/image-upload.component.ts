/**
 * Image upload component
 * @packageDocumentation
 */

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import bsCustomFileInput from 'bs-custom-file-input';

import { ImageService } from '../image.service';
import { Image } from '../image.model';
import { Alert, AlertType } from '../../http-alert/alert.model';


/**
 * Image upload component
 *
 * This component presents a form to the user for adding, updating, or deleting
 * an image to, of, or from a diary entry, respectively.
 */
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  /**
   * HTML form element corresponding to the reactive form
   */
  @ViewChild('imageFormElement')
  imageFormElement = new ElementRef({
    reset: () => {
      // this mock native element with a mock reset method gets overriden after
      // initalization with the actual form element
    }
  });

  /**
   * Diary entry's ID the new/injected image is linked to
   */
  @Input() entryId = '';

  /**
   * Optional: inject an existing image that should be updated/deleted.
   */
  @Input() image: Image = {
    _id: '',
    description: '',
    createdAt: '',
    updatedAt: ''
  };

  /**
   * Inform the parent component that the injected image was changed.
   */
  @Output() imageChange = new EventEmitter<Image>();

  /**
   * Inform the parent component that the injected image was deleted.
   */
  @Output() imageDelete = new EventEmitter<Image>();

  /**
   * Inform the parent component that a request is being processed by the
   * back-end server.
   */
  @Output() processing = new EventEmitter<boolean>();

  /**
   * Reactive form for uploading/updating an image
   */
  imageForm: FormGroup;

  /**
   * Show spinner instead of submit button and disable the delete button while
   * a request is being processed by the back-end server.
   */
  processUploadRequest = false;

  /**
   * Show spinner instead of delete button and disable the submit button while
   * a delete request is being processed by the back-end server.
   */
  processDeleteRequest = false;

  /**
   * Corresponds to the alert message that is shown in case of HTTP errors
   */
  httpAlert = new Alert();

  /**
   * Construct the image upload component.
   *
   * @param formBuilder
   *   Builds the reactive form for uploading/updating an image.
   * @param imageService
   *   Service for uploading or deleting an image to or from the back-end
   *   server, respectively
   */
  constructor(formBuilder: FormBuilder, private imageService: ImageService) {
    // call this method before the mock native element gets overriden just for
    // increasing the test coverage
    this.imageFormElement.nativeElement.reset();

    // build the image form
    this.imageForm = formBuilder.group({
      files: [null, Validators.required],
      description: ['', Validators.required]
    });
  }

  /**
   * Initialize the image upload component.
   */
  ngOnInit(): void {
    // style file input tag
    bsCustomFileInput.init();

    this.description.setValue(this.image.description);

    if (this.image._id.length > 0) {
      this.files.clearValidators();
    }
  }

  /**
   * Files form control
   */
  get files(): FormControl {
    return this.imageForm.get('files') as FormControl;
  }

  /**
   * Description form control
   */
  get description(): FormControl {
    return this.imageForm.get('description') as FormControl;
  }

  /**
   * Delete the injected image from the back-end server.
   */
  deleteImage(): void {
    // activate the spinner; is deactivated after back-end server has
    // responded.
    this.processDeleteRequest = true;
    this.processing.emit(true);

    // reset alert message
    this.httpAlert.alertType = AlertType.none;

    this.imageService.deleteImage(this.entryId, this.image._id).subscribe(
        (image: Image) => {
          this.processDeleteRequest = false;
          this.processing.emit(false);
          this.imageDelete.emit(image);
        },
        (alertType: AlertType) => {
          this.processDeleteRequest = false;
          this.processing.emit(false);
          this.httpAlert.alertType = alertType;
        });
  }

  /**
   * Submit an image upload/update request to the back-end server.
   */
  onSubmit(): void {
    const upload: Image = {...this.image};
    const formValue = this.imageForm.value;

    if (formValue.files) {
      upload.file = formValue.files[0];
    }

    upload.description = formValue.description;

    const update = this.image._id.length > 0;

    const request = (image: Image): Observable<Image> => update
        ? this.imageService.updateImage(image)
        : this.imageService.uploadImage(this.entryId, image);

    // reset alert message
    this.httpAlert.alertType = AlertType.none;

    // activate spinner; deactivated when server has responded
    this.processUploadRequest = true;
    this.processing.emit(true);

    request(upload).subscribe(
      (image: Image) => {
        this.processUploadRequest = false;
        this.processing.emit(false);

        if (update) {
          this.imageChange.emit(Object.assign(this.image, image));
        } else {
          this.imageChange.emit(image);
          this.imageFormElement.nativeElement.reset();
          this.imageForm.reset();
        }
      },
      (alertType: AlertType) => {
        this.processUploadRequest = false;
        this.processing.emit(false);
        this.httpAlert.alertType = alertType;
      });
  }
}
