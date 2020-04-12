/**
 * Diary entry card component
 * @packageDocumentation
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryService } from '../diary-entry.service';
import { DiaryEntry } from '../diary-entry.model';

import {
  DiaryEntryFormComponent
} from '../diary-entry-form/diary-entry-form.component';

import {
  DiaryEntryModalComponent
} from '../diary-entry-modal/diary-entry-modal.component';

import {
  ImageModalComponent
} from '../../image/image-modal/image-modal.component';


/**
 * Diary entry card component
 *
 * This component presents a diary entry's brief version to the user via
 * Bootstrap's card component.
 */
@Component({
  selector: 'app-diary-entry-card',
  templateUrl: './diary-entry-card.component.html',
  styleUrls: ['./diary-entry-card.component.scss']
})
export class DiaryEntryCardComponent {
  /**
   * Injected diary entry
   */
  @Input() diaryEntry: DiaryEntry;

  /**
   * If the admin user clicks the delete button, notify the parent comment that
   * the injected diary entry was deleted from the back-end server and provide
   * its ID.
   */
  @Output() deletedEntryId = new EventEmitter<string>();

  /**
   * Show a spinner instead of the delete button and disable all other buttons,
   * which are shown in this Bootstrap card, as long as the delete request is
   * being processed.
   */
  showSpinner = false;

  /**
   * Alert message that is shown is case of HTTP errors
   */
  alertMessage = '';

  /**
   * Construct the diary entry card component.
   *
   * @param modalService
   *   Service for showing the Bootstrap's modal components that are linked to
   *   this component
   * @param diaryEntryService
   *   Service for deleting the injected diary entry from the back-end server
   */
  constructor(
      private modalService: NgbModal,
      private diaryEntryService: DiaryEntryService) { }

  /**
   * Show full diary entry.
   *
   * Open the Bootstrap modal that shows the full injected diary entry.
   */
  openEntryModal(): void {
    const modal = this.modalService.open(DiaryEntryModalComponent);
    modal.componentInstance.diaryEntry = this.diaryEntry;
  }

  /**
   * Update diary entry.
   *
   * Open the Bootstrap modal that shows the form for updating the injected
   * diary entry.
   */
  openUpdateEntryModal(): void {
    const modal = this.modalService.open(DiaryEntryFormComponent, {
      backdrop: 'static',
      keyboard: false
    });

    modal.componentInstance.modalTitle = 'Bearbeite Tagebucheintrag';
    modal.componentInstance.diaryEntry = this.diaryEntry;

    modal.result.then((diaryEntry?: DiaryEntry) => {
      if (diaryEntry) {
        // update view of injected diary entry
        this.diaryEntry = diaryEntry;
      }
    });
  }

  /**
   * Update/add images.
   *
   * Open the Bootstrap modal that shows the form for updating the injected
   * diary entry's images and for adding new images to it.
   */
  openImageModal(): void {
    const modal = this.modalService.open(ImageModalComponent, {
      backdrop: 'static',
      keyboard: false
    });

    modal.componentInstance.diaryEntry = this.diaryEntry;
  }

  /**
   * Delete diary entry.
   *
   * Delete the injected diary entry from the back-end server and notify the
   * parent component about its deletion.
   */
  deleteEntry(): void {
    // show spinner while the delete request is being processed
    this.showSpinner = true;

    // reset alert message
    this.alertMessage = '';

    this.diaryEntryService.deleteEntry(this.diaryEntry._id).subscribe(
      (diaryEntry: DiaryEntry) => {
        this.deletedEntryId.emit(diaryEntry._id);
        this.showSpinner = false;
      },
      (error: string) => {
        this.showSpinner = false;
        this.alertMessage = error;
      }
    );
  }
}
