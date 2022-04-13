/**
 * Diary entry form component
 * @packageDocumentation
 */

import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { DateRangeService } from '../../date-range/date-range.service';
import { DateRangeValidator } from '../../date-range/date-range-validator';
import { Alert, AlertType } from '../../http-alert/alert.model';
import { Image } from '../../image/image.model';
import { DiaryEntry } from '../diary-entry.model';
import { DiaryEntryService } from '../diary-entry.service';

/**
 * Diary entry form component
 *
 * This component presents a form to the user for creating or updating diary
 * entries on the back-end server via Bootstrap's modal component.
 */
@Component({
  selector: 'app-diary-entry-form',
  templateUrl: './diary-entry-form.component.html',
  styleUrls: ['./diary-entry-form.component.scss'],
})
export class DiaryEntryFormComponent implements OnInit {
  /**
   * Move image down icon
   */
  moveImageDownIcon = faArrowDown;

  /**
   * Move image up icon
   */
  moveImageUpIcon = faArrowUp;

  /**
   * Modal's title
   */
  @Input() modalTitle = 'Erstelle Tagebucheintrag';

  /**
   * Optional: inject a diary entry that should be updated.
   */
  @Input() diaryEntry: DiaryEntry = {
    id: '',
    title: '',
    location: '',
    body: '',
    images: [],
    searchTags: [],
    createdAt: '',
    updatedAt: '',
  };

  /**
   * Shown vertical list of injected diary entry's images
   */
  imageList: Image[] = [];

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
   * Corresponds to the alert message that is shown in case of HTTP errors
   */
  httpAlert = new Alert();

  /**
   * Construct the diary entry form component.
   *
   * @param formBuilder
   *   Builds the reactive form for creating/updating a diary entry.
   * @param dateRangeService
   *   Service for parsing/formatting date ranges
   * @param diaryEntryService
   *   Service for saving/updating diary entries to/on the back-end server
   * @param modal
   *   Holds a reference to the modal.
   */
  constructor(
    formBuilder: FormBuilder,
    dateRangeService: DateRangeService,
    private diaryEntryService: DiaryEntryService,
    private modal: NgbActiveModal
  ) {
    // build the diary entry form
    this.diaryEntryForm = formBuilder.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      dateRange: [null, DateRangeValidator.isValid(dateRangeService)],
      body: ['', Validators.required],
      searchTags: [[]],
      previewImage: [null],
    });
  }

  /**
   * Initialize the diary entry form component.
   */
  ngOnInit(): void {
    this.title.setValue(this.diaryEntry.title);
    this.location.setValue(this.diaryEntry.location);
    this.body.setValue(this.diaryEntry.body);
    this.searchTags.setValue(this.diaryEntry.searchTags);
    this.previewImage.setValue(this.diaryEntry.previewImage ?? null);
    this.imageList = [...this.diaryEntry.images];
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
  get location(): FormControl {
    return this.diaryEntryForm.get('location') as FormControl;
  }

  /**
   * Date range form control
   */
  get dateRange(): FormControl {
    return this.diaryEntryForm.get('dateRange') as FormControl;
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
  get searchTags(): FormControl {
    return this.diaryEntryForm.get('searchTags') as FormControl;
  }

  /**
   * Preview image form control
   */
  get previewImage(): FormControl {
    return this.diaryEntryForm.get('previewImage') as FormControl;
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
    const next = (index + 1) % this.imageList.length;
    const image = this.imageList.splice(index, 1)[0];
    this.imageList.splice(next, 0, image);
  }

  /**
   * Move the given image up in the shown vertical list of images.
   *
   * @param index
   *   Image's index
   */
  moveImageUp(index: number): void {
    const prev = (index > 0 ? index : this.imageList.length) - 1;
    const image = this.imageList.splice(index, 1)[0];
    this.imageList.splice(prev, 0, image);
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

    const entryFromForm: DiaryEntry = {
      id: this.diaryEntry.id,
      title: formValue.title,
      location: formValue.location,
      body: formValue.body,
      previewImage: formValue.previewImage ?? undefined,
      images: this.imageList,
      searchTags: formValue.searchTags,
      createdAt: this.diaryEntry.createdAt,
      updatedAt: this.diaryEntry.updatedAt,
    };

    const request = this.diaryEntry.id
      ? this.diaryEntryService.updateEntry(entryFromForm)
      : this.diaryEntryService.saveEntry(entryFromForm);

    // reset alert message
    this.httpAlert.alertType = AlertType.none;

    // activate spinner; gets deactivated again when back-end server has
    // responded
    this.processRequest = true;

    request.subscribe(
      (diaryEntry: DiaryEntry) => {
        this.processRequest = false;
        // update view of existing diary; give newly created diary
        // entry to parent component
        this.modal.close(Object.assign(this.diaryEntry, diaryEntry));
      },
      (alertType: AlertType) => {
        this.processRequest = false;
        this.httpAlert.alertType = alertType;
      }
    );
  }
}
