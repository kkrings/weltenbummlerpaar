/**
 * Image upload component
 * @packageDocumentation
 */

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';

import { of } from 'rxjs';
import bsCustomFileInput from 'bs-custom-file-input';

import { ImageService } from '../shared/image.service';
import { Image } from '../shared/image.model';


/**
 * Image upload component
 *
 * This component presents a form to the user for uploading an image to the
 * back-end server.
 */
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  /**
   * The uploaded image is emitted back to the parent component.
   */
  @Output() uploadedImage = new EventEmitter<Image>();

  /**
   * Reactive form for image upload
   */
  imageForm: FormGroup;

  /**
   * Alert message that is shown in case of HTTP errors
   */
  alertMessage = '';

  /**
   * Construct the image upload component.
   *
   * @param formBuilder
   *   Builds the reactive for for the image upload.
   */
  constructor(
      private formBuilder: FormBuilder,
      private imageService: ImageService) { }

  /**
   * Initialize the image upload component.
   */
  ngOnInit(): void {
    // this module allows to style the file input tag
    bsCustomFileInput.init();

    // build the image upload form
    this.imageForm = this.formBuilder.group({
      imageFile: [null, Validators.required],
      description: ['', Validators.required]
    });
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
   * Submit image upload request to back-end server.
   */
  onSubmit(): void {
    const {imageFile, description} = this.imageForm.value;

    // image upload functions via multipart/form-data
    const imageData = new FormData();
    imageData.append('image', imageFile);
    imageData.append('description', description);

    // reset alert message
    this.alertMessage = '';

    this.imageService.upload(imageData).subscribe(
      (image: Image) => {
        this.uploadedImage.emit(image);
        this.imageForm.reset();
      },
      (error: string) => this.alertMessage = error
    );
  }
}
