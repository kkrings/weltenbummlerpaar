/**
 * Diary entry form component
 * @packageDocumentation
 */

import { Component, OnInit, Input } from '@angular/core';

import {
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryService } from '../diary-entry.service';
import { DiaryEntry } from '../diary-entry.model';


/**
 * Diary entry form component
 *
 * This component presents a form to the user for creating or updating diary
 * entries on the back-end server via Bootstrap's modal component.
 */
@Component({
  selector: 'app-diary-entry-form',
  templateUrl: './diary-entry-form.component.html',
  styleUrls: ['./diary-entry-form.component.scss']
})
export class DiaryEntryFormComponent implements OnInit {
  /**
   * Modal's title
   */
  @Input() modalTitle = 'Erstelle Tagebucheintrag';

  /**
   * Optional: inject a diary entry that should be updated.
   */
  @Input() diaryEntry: DiaryEntry = {
    _id: '',
    title: '',
    locationName: '',
    body: '',
    images: [],
    tags: [],
    createdAt: '',
    updatedAt: ''
  };

  /**
   * Reactive form for creating/updating a diary entry
   */
  diaryEntryForm: FormGroup;

  /**
   * Show a spinner instead of the submit button and disable the modal's close
   * buttons while the request is being processed by the back-end server.
   */
  processRequest = false;

  /**
   * Alert message that is shown in case of HTTP errors
   */
  alertMessage = '';

  /**
   * Construct the diary entry form component.
   *
   * @param formBuilder
   *   Builds the reactive form for creating/updating a diary entry.
   * @param diaryEntryService
   *   Service for saving/updating diary entries to/on the back-end server
   * @param modal
   *   Holds a reference to the modal.
   */
  constructor(
      private formBuilder: FormBuilder,
      private diaryEntryService: DiaryEntryService,
      private modal: NgbActiveModal) {}

  /**
   * Initialize the diary entry form component.
   */
  ngOnInit(): void {
    // build the diary entry form
    this.diaryEntryForm = this.formBuilder.group({
      title: [this.diaryEntry.title, Validators.required],
      locationName: [this.diaryEntry.locationName, Validators.required],
      body: [this.diaryEntry.body, Validators.required],
      tags: [this.diaryEntry.tags.join(', ')]
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
   * Tags form control
   */
  get tags(): FormControl {
    return this.diaryEntryForm.get('tags') as FormControl;
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
   * Move the given image down in the shown vertical list of images.
   *
   * @param index
   *   Image's index
   */
  moveImageDown(index: number): void {
    const next = (index + 1) % this.diaryEntry.images.length;
    const image = this.diaryEntry.images.splice(index, 1)[0];
    this.diaryEntry.images.splice(next, 0, image);
  }

  /**
   * Move the given image up in the shown vertical list of images.
   *
   * @param index
   *   Image's index
   */
  moveImageUp(index: number): void {
    const prev = ((index > 0) ? index : this.diaryEntry.images.length) - 1;
    const image = this.diaryEntry.images.splice(index, 1)[0];
    this.diaryEntry.images.splice(prev, 0, image);
  }

  /**
   * Close the modal without passing anything back to the parent component.
   */
  closeModal(): void {
    this.modal.close();
  }

  /**
   * Form submission
   *
   * Submit created/updated diary entry to the back-end server and pass it back
   * to the parent component.
   */
  onSubmit(): void {
    const formValue = this.diaryEntryForm.value;

    this.diaryEntry.title = formValue.title;
    this.diaryEntry.locationName = formValue.locationName;
    this.diaryEntry.body = formValue.body;
    this.diaryEntry.tags = formValue.tags.split(', ');

    const request = (this.diaryEntry._id)
        ? this.diaryEntryService.updateEntry(this.diaryEntry)
        : this.diaryEntryService.saveEntry(this.diaryEntry);

    // reset alert message
    this.alertMessage = '';

    // activate spinner; gets deactivated again when back-end server has
    // responded
    this.processRequest = true;

    request.subscribe(
      (diaryEntry: DiaryEntry) => {
        this.processRequest = false;
        this.modal.close(diaryEntry);
      },
      (error: string) => {
        this.processRequest = false;
        this.alertMessage = error;
      });
  }
}
