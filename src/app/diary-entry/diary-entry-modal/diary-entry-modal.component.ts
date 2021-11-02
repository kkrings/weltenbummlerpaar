/**
 * Diary entry modal component
 * @packageDocumentation
 */

import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntry } from '../diary-entry.model';

/**
 * Diary entry modal component
 *
 * This component presents a full diary entry to the user via Bootstrap's modal
 * component.
 */
@Component({
  selector: 'app-diary-entry-modal',
  templateUrl: './diary-entry-modal.component.html',
  styleUrls: ['./diary-entry-modal.component.scss'],
})
export class DiaryEntryModalComponent {
  /**
   * Input diary entry
   */
  @Input() diaryEntry: DiaryEntry = {
    _id: '',
    title: '',
    locationName: '',
    body: '',
    images: [],
    tags: [],
    createdAt: '',
    updatedAt: '',
  };

  /**
   * Construct the diary entry modal component.
   *
   * @param modal
   *   Holds a reference to the modal.
   */
  constructor(private modal: NgbActiveModal) {}

  /**
   * Close the diary entry modal.
   */
  close(): void {
    this.modal.close();
  }
}
