/**
 * Diary entry grid component
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';

import { DiaryEntry } from '../shared/diary-entry.model';
import { DiaryEntryService } from '../shared/diary-entry.service';


/**
 * Diary entry grid component
 *
 * This component presents a grid of diary entry card components to the user.
 */
@Component({
  selector: 'app-diary-entry-grid',
  templateUrl: './diary-entry-grid.component.html',
  styleUrls: ['./diary-entry-grid.component.scss']
})
export class DiaryEntryGridComponent implements OnInit {
  /**
   * List of diary entries
   */
  diaryEntries: DiaryEntry[];

  /**
   * Show a spinner while the list of diary entries is requested from the
   * back-ender server.
   */
  showSpinner = true;

  /**
   * Alert message that is shown in case of HTTP errors
   */
  alertMessage: string;

  /**
   * Construct the diary entry grid component.
   *
   * @param diaryEntryService
   *   Service for requesting the list of diary entries from the back-end
   *   server
   */
  constructor(private diaryEntryService: DiaryEntryService) { }

  /**
   * Initialize the diary entry grid component.
   *
   * Subscribe to the list of diary entries when the component is initialized.
   */
  ngOnInit() {
    this.diaryEntryService.getEntries().subscribe(
        (diaryEntries: DiaryEntry[]) => {
          this.showSpinner = false;
          this.diaryEntries = diaryEntries;
        },
        (error: string) => {
          this.showSpinner = false;
          this.alertMessage = error;
        });
  }

  /**
   * Specifies if diary entries are available for presentation.
   *
   * @returns
   *   Boolean specifying if list of loaded diary entries is not empty.
   */
  hasDiaryEntries(): boolean {
    return this.diaryEntries !== undefined && this.diaryEntries.length > 0;
  }

  /**
   * If the list of diary entries is empty, the user is informed that no diary
   * entries have been added yet.
   *
   * @returns
   *   Boolean specifying if list of loaded diary entries is empty.
   */
  noDiaryEntries(): boolean {
    return this.diaryEntries !== undefined && this.diaryEntries.length === 0;
  }
}
