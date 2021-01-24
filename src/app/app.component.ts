/**
 * Root component
 * @packageDocumentation
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, map, switchMap
} from 'rxjs/operators';

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
export class AppComponent implements OnInit, OnDestroy {
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
   * Reactive form for searching for diary entries given a list of tags
   */
  diaryEntrySearchForm: FormGroup;

  /**
   * Whenever the comma-separated list of tags for searching for diary entries
   * changes, send a new search request to the back-end server.
   */
  private diaryEntrySearchTagsOnValueChanges = Subscription.EMPTY;

  /**
   * Construct the root component.
   *
   * @param diaryEntryService
   *   Service for requesting the list of diary entries from the back-end
   *   server
   */
  constructor(
      private ngbConfig: NgbConfig,
      private diaryEntryService: DiaryEntryService,
      private formBuilder: FormBuilder
  ) {
    this.ngbConfig.animation = environment.animation;
    this.diaryEntrySearchForm = this.formBuilder.group({ tags: [''] });
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

    this.subscribeToDiaryEntrySearchForm();
  }

  /**
   * On destroy, unsubscribe from the diary entry search form's tags input.
   */
  ngOnDestroy(): void {
    this.diaryEntrySearchTagsOnValueChanges.unsubscribe();
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
              this.showSpinner = true;
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
              this.showSpinner = false;
              this.diaryEntries = diaryEntries;
            },
            (error: string) => {
              this.showSpinner = false;
              this.alertMessage = error;
            });
  }
}
