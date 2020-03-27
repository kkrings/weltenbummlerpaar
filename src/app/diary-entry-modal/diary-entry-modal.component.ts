/**
 * Diary entry modal component
 * @packageDocumentation
 */

import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntry } from '../shared/diary-entry.model';


/**
 * Diary entry modal component
 *
 * This component presents a full diary entry to the user via Bootstrap's modal
 * component.
 */
@Component({
  selector: 'app-diary-entry-modal',
  templateUrl: './diary-entry-modal.component.html',
  styleUrls: ['./diary-entry-modal.component.scss']
})
export class DiaryEntryModalComponent implements OnInit {
  /**
   * Input diary entry
   */
  @Input() diaryEntry: DiaryEntry;

  /**
   * Construct the diary entry modal component.
   *
   * @param modal
   *   Holds a reference to the modal.
   */
  constructor(private modal: NgbActiveModal) { }

  /**
   * Initialize the diary entry modal component.
   */
  ngOnInit(): void { }

  /**
   * Close the diary entry modal.
   */
  close(): void {
    this.modal.dismiss();
  }
}
