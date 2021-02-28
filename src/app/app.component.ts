/**
 * Root component
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryService } from './diary-entry/diary-entry.service';
import { DiaryEntry } from './diary-entry/diary-entry.model';
import { environment } from '../environments/environment';


/**
 * Root component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * Alternative welcome message if welcome image cannot be loaded
   */
  welcomeMessage = 'Willkommen in unserem Reisetagebuch';

  /**
   * List of shown diary entries
   */
  diaryEntries: DiaryEntry[] = [];

  /**
   * Show a spinner while a list of diary entries is requested from the
   * back-ender server.
   */
  showSpinner = true;

  /**
   * Alert message that is shown in case of HTTP errors
   */
  alertMessage = '';

  /**
   * Construct the root component.
   *
   * @param nbgConfig
   *   Bootstrap configuration service
   * @param diaryEntryService
   *   Service for requesting the list of diary entries from the back-end
   *   server
   */
  constructor(ngbConfig: NgbConfig, private diaryEntryService: DiaryEntryService) {
    ngbConfig.animation = environment.animation;
  }

  /**
   * On initialization, subscribe to the list of diary entries and listen for
   * changes in the diary entry search form's tags input.
   */
  ngOnInit(): void {
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
   * Add a newly created diary entry to the list of shown diary entries.
   *
   * @param diaryEntry
   *   Newly created diary entry
   */
  addDiaryEntry(diaryEntry: DiaryEntry): void {
    this.diaryEntries.unshift(diaryEntry);
  }
}
