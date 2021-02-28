/**
 * Diary entry search form component
 * @packageDocumentation
 */

import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import * as alert from '../../../shared/alert.model';
import { DiaryEntry } from '../../diary-entry.model';
import { DiaryEntrySearchResult } from '../diary-entry-search.model';
import { DiaryEntrySearchService } from '../diary-entry-search.service';


/**
 * Diary entry search form component
 *
 * This component allows the user to search for diary entries given a
 * comma-separated list of search tags
 */
@Component({
  selector: 'app-diary-entry-search-form',
  templateUrl: './diary-entry-search-form.component.html',
  styleUrls: ['./diary-entry-search-form.component.scss']
})
export class DiaryEntrySearchFormComponent implements OnInit, OnDestroy {
  /**
   * List of found diary entries
   */
  @Output() diaryEntries = new EventEmitter<DiaryEntry[]>();

  /**
   * Reactive form for searching for diary entries given a list of tags
   */
  diaryEntrySearchForm: FormGroup;

  /**
   * Show spinner while search for diary entries is processing.
   */
  processingSearch = false;

  /**
   * Alert message that is shown in case of HTTP errors or if no diary entries
   * could be found.
   */
  alertMessage = alert.NOALERT;

  /**
   * Whenever the comma-separated list of tags for searching for diary entries
   * changes, send a new search request to the back-end server.
   */
  private onDiaryEntries = Subscription.EMPTY;

  private onSearching = Subscription.EMPTY;

  /**
   * Show this message if no diary entries could be found.
   */
  private noEntriesFound = 'Ich konnte leider keine Tagebucheinträge finden.';

  /**
   * Construct the diary entry search form component.
   *
   * @param formBuilder
   *   Service for building the diary entry search form
   * @param diaryEntryService
   *   Service for searching for diary entries on the back-end server
   */
  constructor(formBuilder: FormBuilder, private diaryEntrySearchService: DiaryEntrySearchService) {
    this.diaryEntrySearchForm = formBuilder.group({tags: ['']});
  }

  /**
   * On initialization, listen for changes in the diary entry search form's
   * tags input.
   */
  ngOnInit(): void {
    this.subscribe();
  }

  /**
   * On destroy, unsubscribe from the diary entry search form's tags input.
   */
  ngOnDestroy(): void {
    this.unsubscribe();
  }

  hasAlertMessage(): boolean {
    return this.alertMessage !== alert.NOALERT;
  }

  /**
   * Diary entries search tags form control
   */
  get diaryEntrySearchTags(): FormControl {
    return this.diaryEntrySearchForm.get('tags') as FormControl;
  }

  private subscribe(): void {
    this.diaryEntrySearchService.subscribeToSearchTags(this.diaryEntrySearchTags.valueChanges);

    this.onDiaryEntries = this.diaryEntrySearchService.diaryEntries$.subscribe(
        result => this.emitEntries(result),
        error => this.alertMessage = alert.shoutDanger(error));

    this.onSearching = this.diaryEntrySearchService.searching$.subscribe(
        searching => this.processingSearch = searching);
  }

  private unsubscribe(): void {
    this.diaryEntrySearchService.unsubscribeFromSearchTags();
    this.onDiaryEntries.unsubscribe();
    this.onSearching.unsubscribe();
  }

  private emitEntries(searchResult: DiaryEntrySearchResult): void {
    if (searchResult.entries.length > 0) {
      this.diaryEntries.emit(searchResult.entries);
    } else {
      this.alertMessage = alert.shoutWarning(this.noEntriesFound);
    }
  }
}
