/**
 * Diary entry grid component
 * @packageDocumentation
 */

import { Component, Input } from '@angular/core';

import { DiaryEntry } from '../diary-entry.model';

/**
 * Diary entry grid component
 *
 * This component presents a grid of diary entry card components to the user.
 */
@Component({
  selector: 'app-diary-entry-grid',
  templateUrl: './diary-entry-grid.component.html',
  styleUrls: ['./diary-entry-grid.component.scss'],
})
export class DiaryEntryGridComponent {
  /**
   * List of shown diary entries
   */
  @Input() diaryEntries: DiaryEntry[] = [];

  /**
   * Delete diary entry given its ID.
   *
   * Delete diary entry from the list of shown diary entries.
   *
   * @param entryId
   *   Diary entry's ID
   */
  deleteDiaryEntry(entryId: string): void {
    this.diaryEntries = this.diaryEntries.filter(
      (diaryEntry: DiaryEntry) => diaryEntry.id !== entryId
    );
  }
}
