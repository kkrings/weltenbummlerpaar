/**
 * Image upload component
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';

import {
  FormControl, FormGroup, FormBuilder, Validators
} from '@angular/forms';

import { concatMap } from 'rxjs/operators';
import bsCustomFileInput from 'bs-custom-file-input';

import { ImageService } from '../image.service';
import { Image } from '../image.model';


/**
 * Image upload component
 */
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  /**
   * Reactive form for uploading an image
   */
  imageForm: FormGroup;

  /**
   * Show spinner instead of submit button while post request is processed.
   */
  processRequest = false;

  /**
   * Alert message that is shown in case of HTTP errors
   */
  alertMessage = '';

  /**
   * Construct the image upload component.
   *
   * @param formBuilder
   *   Builds the reactive form for uploading an image.
   */
  constructor(
      private formBuilder: FormBuilder,
      private imageService: ImageService) { }

  /**
   * Initialize the image upload component.
   */
  ngOnInit(): void {
    // styles file input
    bsCustomFileInput.init();

    // build the image form
    this.imageForm = this.formBuilder.group({
      images: [null, Validators.required],
      description: ['', Validators.required]
    });
  }

  /**
   * Images form control
   */
  get images(): FormControl {
    return this.imageForm.get('images') as FormControl;
  }

  /**
   * Description form control
   */
  get description(): FormControl {
    return this.imageForm.get('description') as FormControl;
  }

  /**
   * Submit image upload request to back-end server.
   */
  onSubmit(): void {
    const {images, description} = this.imageForm.value;

    // reset alert message
    this.alertMessage = '';

    // activate spinner; deactivated when server has responded
    this.processRequest = true;

    this.imageService.compressImage(images[0])
        .pipe(concatMap(
            (compImage) => {
              return this.imageService.uploadImage(compImage, description);
            }))
        .subscribe(
            (image: Image) => {
              this.processRequest = false;
              this.imageForm.reset();
              console.log(image);
            },
            (error: string) => {
              this.processRequest = false;
              this.alertMessage = error;
            });
  }
}
