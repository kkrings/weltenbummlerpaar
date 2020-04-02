/**
 * Image form component
 * @packageDocumentation
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import {
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';

import bsCustomFileInput from 'bs-custom-file-input';

import { ImageService } from '../shared/image.service';
import { Image } from '../shared/image.model';


/**
 * Image form component
 *
 * This component presents a form to the user for uploading, updating, or
 * deleting images to, on, or from the back-end server, respectively.
 */
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  /**
   * Update/delete an existing image.
   */
  @Input() inputImage: Image;

  /**
   * The uploaded image is emitted back to the parent component.
   */
  @Output() uploadedImage = new EventEmitter<Image>();

  /**
   * The ID of the deleted image is emitted back to the parent component.
   */
  @Output() deletedImage = new EventEmitter<string>();

  /**
   * Reactive form for image upload/update
   */
  imageForm: FormGroup;

  /**
   * Show a spinner while sending a upload/update request to the back-end
   * server and waiting for its response.
   */
  showUploadSpinner = false;

  /**
   * Show a spinner while sending a delete request to the back-end server and
   * waiting for its response.
   */
  showDeleteSpinner = false;

  /**
   * Alert message that is shown in case of HTTP errors
   */
  alertMessage = '';

  /**
   * Construct the image form component.
   *
   * @param formBuilder
   *   Builds the reactive form for uploading/updating images.
   * @param imageService
   *   Service for uploading, updating, or deleting images to, on, or from the
   *   back-end server, respectively
   */
  constructor(
      private formBuilder: FormBuilder,
      private imageService: ImageService) { }

  /**
   * Initialize the image form component.
   */
  ngOnInit(): void {
    // this module allows to style the file input tag
    bsCustomFileInput.init();

    // build the image upload/update form
    if (this.inputImage) {
      this.imageForm = this.formBuilder.group({
        imageFile: [null],
        description: [this.inputImage.description, Validators.required]
      });
    } else {
      this.imageForm = this.formBuilder.group({
        imageFile: [null, Validators.required],
        description: ['', Validators.required]
      });
    }
  }

  /**
   * Image file form control
   */
  get imageFile(): FormControl {
    return this.imageForm.get('imageFile') as FormControl;
  }

  /**
   * Description form control
   */
  get description(): FormControl {
    return this.imageForm.get('description') as FormControl;
  }

  /**
   * Form control validation
   *
   * @param formControl
   *   Form control
   *
   * @returns
   *   If true, form control is invalid.
   */
  isInvalid(formControl: FormControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  /**
   * Submit image upload/update request to back-end server.
   */
  onSubmit(): void {
    const {imageFile, description} = this.imageForm.value;

    // image representation; upload/update is based on multipart/form-data
    const imageFormData = new FormData();
    imageFormData.append('image', imageFile);
    imageFormData.append('description', description);

    let request: Observable<Image>;

    if (this.inputImage) {
      request = this.imageService.updateImage(
          this.inputImage._id, imageFormData);
    } else {
      request = this.imageService.uploadImage(imageFormData);
    }

    // show spinner while talking to the back-end server
    this.showUploadSpinner = true;

    // reset alert message
    this.alertMessage = '';

    request.subscribe(
      (image: Image) => {
        this.showUploadSpinner = false;
        this.uploadedImage.emit(image);

        if (!this.inputImage) {
          this.imageForm.reset();
        }
      },
      (error: string) => {
        this.showUploadSpinner = false;
        this.alertMessage = error;
      });
  }

  /**
   * Delete the input image from the back-end server.
   */
  deleteInputImage(): void {
    // show spinner while talking to the back-end server
    this.showDeleteSpinner = true;

    // reset alert message
    this.alertMessage = '';

    this.imageService.deleteImage(this.inputImage._id).subscribe(
        (image: Image) => {
          this.showDeleteSpinner = false;
          this.deletedImage.emit(image._id);
        },
        (error: string) => {
          this.showDeleteSpinner = false;
          this.alertMessage = error;
        });
  }
}
