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
   * the diary entry was deleted from the back-end server and provide its ID.
   */
  @Output() deletedEntryId = new EventEmitter<string>();

  /**
   * Show a spinner instead of the delete button and disable the button that
   * opens the full diary entry in a modal when the delete request is being
   * processed.
   */
  showSpinner = false;

  /**
   * Construct the diary entry card component.
   *
   * @param modalService
   *   Service for showing the full diary entry via Bootstrap's modal component
   * @param diaryEntryService
   *   Service for deleting the diary entry on the back-end server
   */
  constructor(
      private modalService: NgbModal,
      private diaryEntryService: DiaryEntryService) { }

  /**
   * Open Bootstrap modal that shows the full diary entry.
   */
  openEntryModal(): void {
    const modal = this.modalService.open(DiaryEntryModalComponent);
    modal.componentInstance.diaryEntry = this.diaryEntry;
  }

  /**
   * Open Bootstrap modal that shows the form for updating the diary entry.
   */
  openUpdateEntryModal(): void {
    const modal = this.modalService.open(DiaryEntryFormComponent, {
      backdrop: 'static',
      keyboard: false
    });

    modal.componentInstance.updateEntry = this.diaryEntry;

    modal.result.then((diaryEntry?: DiaryEntry) => {
      if (diaryEntry) {
        // update view of updated diary entry
        this.diaryEntry = diaryEntry;
      }
    });
  }

  /**
   * Delete diary entry
   *
   * Delete the diary entry from the back-end server and notify the parent
   * component about its deletion.
   */
  deleteEntry(): void {
    // show spinner while the delete request is being processed
    this.showSpinner = true;

    this.diaryEntryService.deleteEntry(this.diaryEntry._id).subscribe(
      (diaryEntry: DiaryEntry) => {
        this.deletedEntryId.emit(diaryEntry._id);
        this.showSpinner = false;
      },
      (error: string) => {
        // @TODO this will most likely be replaced with a message service based
        // on Bootstrap's toasts
        console.error(error);
        this.showSpinner = false;
      }
    );
  }
}
