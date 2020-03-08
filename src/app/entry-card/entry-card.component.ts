/**
 * Diary entry modal component
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { DiaryEntry } from '../shared/entry.model';


/**
 * Diary entry modal component
 *
 * Present diary entry in a Bootstrap modal.
 */
@Component({
  selector: 'app-entry-model',
  templateUrl: './entry-modal.component.html',
  styleUrls: ['./entry-modal.component.scss']
})
export class EntryModalComponent implements OnInit {
  /**
   * Diary entry
   */
  diaryEntry: DiaryEntry;

  /**
   * Construct entry card component.
   *
   * @param modal
   *   Holds a reference to the modal.
   */
  constructor(public modal: BsModalRef) { }

  /**
   * Initialize component.
   */
  ngOnInit() { }
}
