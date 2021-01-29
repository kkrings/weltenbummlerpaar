/**
 * Diary entry search component
 * @packageDocumentation
 */

import {
  Component, OnDestroy, OnInit, Output, EventEmitter
} from '@angular/core';

import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, map, switchMap
} from 'rxjs/operators';

import * as alert from '../../shared/alert.model';
import { DiaryEntry } from '../diary-entry.model';
import { DiaryEntryService } from '../diary-entry.service';


/**
 * Diary entry search component
 *
 * This component allows the user to search for diary entries given a
 * comma-separated list of search tags
 */
@Component({
  selector: 'app-diary-entry-search',
  templateUrl: './diary-entry-search.component.html',
  styleUrls: ['./diary-entry-search.component.scss']
})
export class DiaryEntrySearchComponent implements OnInit, OnDestroy {
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
  private diaryEntrySearchTagsOnValueChanges = Subscription.EMPTY;

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
  constructor(
      formBuilder: FormBuilder,
      private diaryEntryService: DiaryEntryService
  ) {
    this.diaryEntrySearchForm = formBuilder.group({ tags: [''] });
  }

  /**
   * On initialization, listen for changes in the diary entry search form's
   * tags input.
   */
  ngOnInit(): void {
    this.subscribeToDiaryEntrySearchForm();
  }

  /**
   * On destroy, unsubscribe from the diary entry search form's tags input.
   */
  ngOnDestroy(): void {
    this.diaryEntrySearchTagsOnValueChanges.unsubscribe();
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

  /**
   * Subscribe to the diary entry search form's tags input.
   *
   * Whenever the tags for searching for diary entries have changed, send a
   * new search request to the back-end server and do not care about responses
   * from previous search requests.
   */
  private subscribeToDiaryEntrySearchForm(): void {
    this.diaryEntrySearchTagsOnValueChanges = this.diaryEntrySearchTags
        .valueChanges
        .pipe(
            map((tags: string) => {
              this.alertMessage = alert.NOALERT;
              this.processingSearch = true;
              return tags;
            }),
            debounceTime(500),
            distinctUntilChanged(),
            map((tags: string) => tags
                  .split(',')
                  .map(tag => tag.trim())
                  .filter(tag => tag.length > 0)),
            switchMap(
              (tags: string[]) => this.diaryEntryService.findEntries(tags)))
        .subscribe(
            (diaryEntries: DiaryEntry[]) => {
              this.processingSearch = false;

              if (diaryEntries.length > 0) {
                this.diaryEntries.emit(diaryEntries);
              } else {
                this.alertMessage = alert.shoutWarning(this.noEntriesFound);
              }
            },
            (error: string) => {
              this.processingSearch = false;
              this.alertMessage = alert.shoutDanger(error);
            });
  }
}
