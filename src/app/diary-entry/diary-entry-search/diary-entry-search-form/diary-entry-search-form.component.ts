/**
 * Diary entry search form component
 * @packageDocumentation
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';

import { DiaryEntrySearchService } from '../diary-entry-search.service';

/**
 * Diary entry search form component
 *
 * This component allows the user to search for diary entries given a list of
 * search tags.
 */
@Component({
  selector: 'app-diary-entry-search-form',
  templateUrl: './diary-entry-search-form.component.html',
  styleUrls: ['./diary-entry-search-form.component.scss'],
})
export class DiaryEntrySearchFormComponent implements OnInit, OnDestroy {
  /**
   * Reactive form for searching for diary entries given a list of tags
   */
  diaryEntrySearchForm: UntypedFormGroup;

  /**
   * Construct the diary entry search form component.
   *
   * @param formBuilder
   *   Service for building the diary entry search form
   * @param diaryEntrySearchService
   *   Service for searching for diary entries on the back-end server
   */
  constructor(
    formBuilder: UntypedFormBuilder,
    private diaryEntrySearchService: DiaryEntrySearchService
  ) {
    this.diaryEntrySearchForm = formBuilder.group({ searchTags: [[]] });
  }

  /**
   * On initialization, listen for changes in the diary entry search form's
   * tags input.
   */
  ngOnInit(): void {
    this.diaryEntrySearchService.subscribeToSearchTags(
      this.diaryEntrySearchTags.valueChanges
    );

    this.diaryEntrySearchTags.setValue([]);
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
  get diaryEntrySearchTags(): UntypedFormControl {
    return this.diaryEntrySearchForm.get('searchTags') as UntypedFormControl;
  }
}
