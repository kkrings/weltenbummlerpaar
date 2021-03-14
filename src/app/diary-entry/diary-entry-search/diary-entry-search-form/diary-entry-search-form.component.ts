/**
 * Diary entry search form component
 * @packageDocumentation
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

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
   * Reactive form for searching for diary entries given a list of tags
   */
  diaryEntrySearchForm: FormGroup;

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
    this.diaryEntrySearchService.subscribeToSearchTags(this.diaryEntrySearchTags.valueChanges);
    this.diaryEntrySearchTags.setValue('');
  }

  /**
   * On destroy, unsubscribe from the diary entry search form's tags input.
   */
  ngOnDestroy(): void {
    this.diaryEntrySearchService.unsubscribeFromSearchTags();
  }

  /**
   * Diary entries search tags form control
   */
  get diaryEntrySearchTags(): FormControl {
    return this.diaryEntrySearchForm.get('tags') as FormControl;
  }
}
