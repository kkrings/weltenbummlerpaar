/**
 * Diary entry form component
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';

import {
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryService } from '../shared/diary-entry.service';
import { DiaryEntry } from '../shared/diary-entry.model';
import { Image } from '../shared/image.model';


/**
 * Diary entry form component
 */
@Component({
  selector: 'app-diary-entry-form',
  templateUrl: './diary-entry-form.component.html',
  styleUrls: ['./diary-entry-form.component.scss']
})
export class DiaryEntryFormComponent implements OnInit {
  /**
   * Reactive form for creating/updating diary entry
   */
  diaryEntryForm: FormGroup;

  /**
   * Holds uploaded images.
   */
  private imageList: Image[] = [];

  /**
   * Show spinner instead of submit button while post/put request is processed.
   */
  showSpinner = false;

  /**
   * Alert message that is shown in case of HTTP errors
   */
  alertMessage = '';

  /**
   * Construct the diary entry form component.
   *
   * @param formBuilder
   *   Builds the reactive form for creating/updating a diary entry.
   * @param modal
   *   Holds a reference to the modal.
   * @param diaryEntryService
   *   Service for saving/updating diary entries on the back-end server
   */
  constructor(
      private formBuilder: FormBuilder,
      private modal: NgbActiveModal,
      private diaryEntryService: DiaryEntryService) { }

  /**
   * Initialize the diary entry form component.
   */
  ngOnInit(): void {
    // build the diary entry form
    this.diaryEntryForm = this.formBuilder.group({
      title: ['', Validators.required],
      locationName: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  /**
   * Title form control
   */
  get title(): FormControl {
    return this.diaryEntryForm.get('title') as FormControl;
  }

  /**
   * Location form control
   */
  get locationName(): FormControl {
    return this.diaryEntryForm.get('locationName') as FormControl;
  }

  /**
   * Body form control
   */
  get body(): FormControl {
    return this.diaryEntryForm.get('body') as FormControl;
  }

  /**
   * Add image to diary entry.
   *
   * @param Image
   *   Image
   */
  addImage(image: Image): void {
    this.imageList.push(image);
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
   * Dismiss the diary entry form modal.
   */
  dismiss(): void {
    this.modal.dismiss();
  }

  /**
   * Submit created/updated diary entry to back-end server.
   */
  onSubmit(): void {
    const diaryEntry: DiaryEntry = this.diaryEntryForm.value;
    diaryEntry.images = this.imageList;

    // reset alert message
    this.alertMessage = '';

    // activate spinner; gets deactivated again when back-end server has
    // responded
    this.showSpinner = true;

    this.diaryEntryService.saveEntry(diaryEntry).subscribe(
      (savedDiaryEntry: DiaryEntry) => {
        this.showSpinner = false;
        this.modal.close(savedDiaryEntry);
      },
      (error: string) => {
        this.showSpinner = false;
        this.alertMessage = error;
      }
    );
  }
}
