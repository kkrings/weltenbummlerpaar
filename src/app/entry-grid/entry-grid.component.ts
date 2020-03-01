/**
 * Diary entry grid component
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';

import { DiaryEntry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';


/**
 * Diary entry grid component
 *
 * Present diary entries' brief versions via Bootstrap cards on a grid.
 */
@Component({
  selector: 'app-entry-grid',
  templateUrl: './entry-grid.component.html',
  styleUrls: ['./entry-grid.component.scss']
})
export class EntryGridComponent implements OnInit {
  /**
   * Loaded list of diary entries
   */
  diaryEntries: DiaryEntry[];

  /**
   * Alert message that is shown in case of HTTP errors
   */
  alertMessage: string;

  /**
   * Construct entry grid component.
   *
   * @param entryService
   *   Diary entry loading service
   */
  constructor(private entryService: EntryService) { }

  /**
   * Subscribe to loaded list of diary entries when component is initialized.
   */
  ngOnInit() {
    this.entryService.getEntries().subscribe(
        (diaryEntries: DiaryEntry[]) => this.diaryEntries = diaryEntries,
        (error: string) => this.alertMessage = error);
  }

  /**
   * Specifies if diary entries are available for presentation.
   *
   * @returns
   *   Boolean specifying if list of loaded diary entries is not empty.
   */
  hasEntries(): boolean {
    return this.diaryEntries !== undefined && this.diaryEntries.length > 0;
  }

  /**
   * If the list of loaded diary entries is empty, the user is informed that no
   * diary entries have been added yet.
   *
   * @returns
   *   Boolean specifying if list of loaded diary entries is empty.
   */
  noEntries(): boolean {
    return this.diaryEntries !== undefined && this.diaryEntries.length === 0;
  }

  /**
   * Brief version of diary entry's body
   *
   * @param diaryEntry
   *   Diary entry
   *
   * @returns
   *   Brief version of diary entry's body
   */
  brief(diaryEntry: DiaryEntry): string {
    // maximum number of characters
    const briefLength = 150;

    let body = '';
    if (diaryEntry.body.length > briefLength) {
      // truncate body after last word and append '...' such that brief body
      // has less than briefLength characters
      const dots = ' ...';
      body = diaryEntry.body.substring(0, briefLength - dots.length + 1);
      const end = body.lastIndexOf(' ');
      body = body.substring(0, end) + dots;
    } else {
      body = diaryEntry.body;
    }

    return body;
  }
}
