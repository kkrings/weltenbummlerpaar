/**
 * Root component
 * @packageDocumentation
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { DiaryEntrySearchService } from './diary-entry/diary-entry-search/diary-entry-search.service';
import { DiaryEntrySearchResult } from './diary-entry/diary-entry-search/diary-entry-search.model';
import { DiaryEntry } from './diary-entry/diary-entry.model';
import { Alert, AlertType } from './http-alert/alert.model';
import { environment } from '../environments/environment';

/**
 * Root component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
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
   * Show an alert message in case HTTP errors.
   */
  httpAlert = new Alert();

  /**
   * Subscription to search state changes
   */
  #updateShowSpinner = Subscription.EMPTY;

  /**
   * Subscription to diary entry source
   */
  #updateDiaryEntries = Subscription.EMPTY;

  /**
   * Construct the root component.
   *
   * @param nbgConfig
   *   Bootstrap configuration service
   * @param diaryEntrySearchService
   *   Service for searching for diary entries on the back-end server
   */
  constructor(
    ngbConfig: NgbConfig,
    private diaryEntrySearchService: DiaryEntrySearchService
  ) {
    ngbConfig.animation = environment.animation;
  }

  /**
   * On initialization, subscribe to diary entry search service.
   */
  ngOnInit(): void {
    this.#updateShowSpinner = this.diaryEntrySearchService.searching$.subscribe(
      (searching: boolean) => (this.showSpinner = searching)
    );

    this.#updateDiaryEntries =
      this.diaryEntrySearchService.diaryEntries$.subscribe(
        (result: DiaryEntrySearchResult) =>
          (this.diaryEntries = result.entries),
        (alertType: AlertType) => (this.httpAlert.alertType = alertType)
      );
  }

  /**
   * On destroy, unsubscribe from diary entry search service.
   */
  ngOnDestroy(): void {
    this.#updateShowSpinner.unsubscribe();
    this.#updateDiaryEntries.unsubscribe();
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
