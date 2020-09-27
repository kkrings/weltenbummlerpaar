/**
 * Image upload component
 * @packageDocumentation
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import {
  FormControl, FormGroup, FormBuilder, Validators
} from '@angular/forms';

import bsCustomFileInput from 'bs-custom-file-input';

import { ImageService } from '../image.service';
import { Image } from '../image.model';


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
   * Alert message that is shown in case of HTTP errors
   */
  alertMessage = '';

  /**
   * Construct the image upload component.
   *
   * @param formBuilder
   *   Builds the reactive form for uploading/updating an image.
   * @param imageService
   *   Service for uploading or deleting an image to or from the back-end
   *   server, respectively
   */
  constructor(
      private formBuilder: FormBuilder,
      private imageService: ImageService
  ) {
    // build the image form
    this.imageForm = this.formBuilder.group({
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
    this.alertMessage = '';

    this.imageService.deleteImage(this.entryId, this.image._id).subscribe(
        (image: Image) => {
          this.processDeleteRequest = false;
          this.processing.emit(false);
          this.imageDelete.emit(image);
        },
        (error: string) => {
          this.processDeleteRequest = false;
          this.processing.emit(false);
          this.alertMessage = error;
        });
  }

  /**
   * Submit an image upload/update request to the back-end server.
   */
  onSubmit(): void {
    const uploadImage: Image = {...this.image};
    const formValue = this.imageForm.value;

    if (formValue.files) {
      uploadImage.file = formValue.files[0];
    }

    uploadImage.description = formValue.description;

    const request = (image: Image): Observable<Image> => {
      if (image._id.length > 0) {
        return this.imageService.updateImage(image);
      } else {
        return this.imageService.uploadImage(this.entryId, image);
      }
    };

    // reset alert message
    this.alertMessage = '';

    // activate spinner; deactivated when server has responded
    this.processUploadRequest = true;
    this.processing.emit(true);

    request(uploadImage).subscribe(
      (image: Image) => {
        this.processUploadRequest = false;
        this.processing.emit(false);
        this.imageChange.emit(Object.assign(this.image, image));
        this.imageForm.reset();
      },
      (error: string) => {
        this.processUploadRequest = false;
        this.processing.emit(false);
        this.alertMessage = error;
      });
  }
}
