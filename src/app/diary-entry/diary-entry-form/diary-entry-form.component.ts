/**
 * Diary entry form component
 * @packageDocumentation
 */

import { Component, OnInit, Input } from '@angular/core';

import {
  FormBuilder, FormArray, FormControl, FormGroup, Validators
} from '@angular/forms';

import { Observable } from 'rxjs';
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
  modalTitle = 'Erstelle Tagebucheintrag';

  /**
   * Text content of form's submit button
   */
  submitButtonText = 'Erstellen';

  /**
   * Update an existing diary entry.
   */
  @Input() updateEntry: DiaryEntry;

  /**
   * Reactive form for creating/updating diary entry
   */
  diaryEntryForm: FormGroup;

  /**
   * Show spinner instead of submit button while post/put request is processed.
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
   *   Service for saving/updating diary entries on the back-end server
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
      title: ['', Validators.required],
      locationName: ['', Validators.required],
      body: ['', Validators.required],
      tags: this.formBuilder.array([])
    });

    if (this.updateEntry) {
      this.diaryEntryForm.patchValue({
        title: this.updateEntry.title,
        locationName: this.updateEntry.locationName,
        body: this.updateEntry.body,
      });

      for (const tag of this.updateEntry.tags) {
        this.tags.push(this.formBuilder.control(tag, Validators.required));
      }

      this.modalTitle = 'Bearbeite Tagebucheintrag';
      this.submitButtonText = 'Bearbeiten';
    }
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
   * Tags form array
   */
  get tags(): FormArray {
    return this.diaryEntryForm.get('tags') as FormArray;
  }

  /**
   * Add a new tag to the tags form array.
   */
  addNewTag(): void {
    this.tags.push(this.formBuilder.control('', Validators.required));
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
   * Close the diary entry form modal without passing anything to the parent
   * component.
   */
  closeModal(): void {
    this.modal.close();
  }

  /**
   * Submit created/updated diary entry to back-end server and pass it to the
   * parent component.
   */
  onSubmit(): void {
    const diaryEntry: DiaryEntry = this.diaryEntryForm.value;

    let request: Observable<DiaryEntry>;
    if (this.updateEntry) {
      diaryEntry._id = this.updateEntry._id;
      request = this.diaryEntryService.updateEntry(diaryEntry);
    } else {
      request = this.diaryEntryService.saveEntry(diaryEntry);
    }

    // reset alert message
    this.alertMessage = '';

    // activate spinner; gets deactivated again when back-end server has
    // responded
    this.processRequest = true;

    request.subscribe(
      (response: DiaryEntry) => {
        this.processRequest = false;
        this.modal.close(response);
      },
      (error: string) => {
        this.processRequest = false;
        this.alertMessage = error;
      }
    );
  }
}
