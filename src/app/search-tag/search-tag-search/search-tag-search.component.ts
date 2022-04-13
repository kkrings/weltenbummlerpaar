/**
 * Search tag search component
 * @packageDocumentation
 */

import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { merge, Observable, of, OperatorFunction, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { Alert, AlertType } from '../../http-alert/alert.model';
import { SearchTagSearchConfig } from '../search-tag-search-config.service';
import { SearchTagService } from '../search-tag.service';

/**
 * Search tag search component
 *
 * This component provides a search form for searching for diary entry search
 * tags on the back-end server. The search form has a type-ahead functionality.
 * The user can further select from the presented list of found not yet selected
 * diary entry search tags and add the selected diary entry search to the shown
 * list of selected diary entry search tags. Moreover, the component also allows
 * to deselect already selected diary entry search tags.
 */
@Component({
  selector: 'app-search-tag-search',
  templateUrl: './search-tag-search.component.html',
  styleUrls: ['./search-tag-search.component.scss'],
})
export class SearchTagSearchComponent {
  /**
   * If equals true, not yet existing diary entry search tags can be set.
   */
  @Input() allowNewSearchTags = false;

  /**
   * If equals true, a search for existing diary entry search on the back-end
   * server is on-going.
   */
  searching = false;

  /**
   * Holds a reference to an alert message that indicates that a search for
   * diary entry search tags on the back-end server has failed.
   */
  httpAlert = new Alert();

  /**
   * Holds a reference to the search form that triggers a search for existing
   * diary entry search tags on the back-end server.
   */
  searchForm: FormGroup;

  /**
   * Holds a reference to the list of selected diary entry search tags.
   */
  searchTags: string[] = [];

  /**
   * This observable streams the list of selected diary entry search tags
   * whenever the selection is changed.
   */
  searchTags$;

  /**
   * Icon for the button for selecting a new diary entry search tag
   */
  addIcon = faPlus;

  /**
   * Icon for the buttons for deselecting diary entry search tags
   */
  deselectIcon = faMinus;

  /**
   * Source for the stream of selected diary entry search tags
   */
  private searchTagsSource = new Subject<string[]>();

  /**
   * This subject fires whenever the search form is focused.
   */
  private focusSource = new Subject<string>();

  /**
   * Triggers a search for existing diary entry search tags on the back-end
   * server given a search string.
   *
   * @param searchTags$
   *   This observable streams the search strings entered by the user.
   *
   * @returns
   *   Stream of found diary entry search tags given a search string
   */
  search: OperatorFunction<string, readonly string[]> = (
    searchTags$: Observable<string>
  ) => this.doSearch(searchTags$);

  /**
   * Construct the search tag search component.
   *
   * @param formBuilder
   *   Holds a reference to the helper service for creating the search form.
   * @param config
   *   Holds a reference to the helper service for configuring the search tag
   *   search.
   * @param searchTagService
   *   Holds a reference to the helper service for communicating with the
   *   back-end server.
   */
  constructor(
    formBuilder: FormBuilder,
    private config: SearchTagSearchConfig,
    private searchTagService: SearchTagService
  ) {
    this.searchForm = formBuilder.group({
      searchTag: ['', Validators.required],
    });

    this.searchTags$ = this.searchTagsSource.asObservable();
  }

  /**
   * If the search form is focused, trigger a new search for diary entry search
   * tags on the back-end server by using the currently entered search string.
   *
   * @param searchTags
   *   Currently entered search string
   */
  onFocus(searchTags: string): void {
    if (this.searchForm.invalid) {
      this.focusSource.next(searchTags);
    }
  }

  /**
   * On submission add the selected diary entry search tag to the list of
   * selected diary entry search tags and emit this updated list.
   */
  onSubmit(): void {
    const { searchTag }: { searchTag: string } = this.searchForm.value;
    this.searchTags.push(searchTag);
    this.searchTagsSource.next(this.searchTags);
    this.searchForm.reset({ searchTag: '' });
  }

  /**
   * Remove the given diary entry search tag from the list of selected diary
   * entry search tags and emit this updated list.
   *
   * @param searchTag
   *   Diary entry search tag that should be removed.
   */
  deselect(searchTag: string): void {
    this.searchTags = this.searchTags.filter((tag) => tag !== searchTag);
    this.searchTagsSource.next(this.searchTags);
  }

  /**
   * This helper function takes care of the search form's type-ahead
   * functionality.
   *
   * @param searchTag$
   *   Stream of search strings entered by the user
   *
   * @returns
   *   Stream of found diary entry search tags
   */
  private doSearch(searchTag$: Observable<string>): Observable<string[]> {
    return merge(searchTag$, this.focusSource).pipe(
      tap(() => (this.searching = true)),
      debounceTime(this.config.waitForNumMs),
      distinctUntilChanged(),
      switchMap((tag) => this.handleSearch(tag)),
      map((searchTags) => this.removeSelected(searchTags)),
      tap(() => (this.searching = false))
    );
  }

  /**
   * This helper function performs the actually search for diary entry search
   * tags on the back-end server by using the given search string.
   *
   * @param searchTag
   *   Search string entered by the user
   *
   * @returns
   *   Found diary entry search tags
   */
  private handleSearch(searchTag: string): Observable<string[]> {
    return this.searchTagService.find(searchTag).pipe(
      tap(() => this.resetAlert()),
      catchError((alertType) => this.handleAlert(alertType))
    );
  }

  /**
   * Show the alert message that corresponds to the given alert type. The alert
   * message indicates that the search for diary entry search tags on the
   * back-end server has failed.
   *
   * @param alertType
   *   Alert type
   *
   * @returns
   *   An empty list of "found" diary entry search tags
   */
  private handleAlert(alertType: AlertType): Observable<string[]> {
    this.httpAlert.alertType = alertType;
    return of([]);
  }

  /**
   * Reset the alert message that indicates that a search for diary entry search
   * tags on the back-end server has failed.
   */
  private resetAlert(): void {
    this.httpAlert.alertType = AlertType.none;
  }

  /**
   * This helper function filters the given diary entry search tag out of the
   * list of selected diary entry search tags.
   *
   * @param searchTags
   *   Diary entry search tag that should be removed from the list of selected
   *   diary entry search tags
   *
   * @returns
   *   List of the remaining selected diary entry search tags.
   */
  private removeSelected(searchTags: string[]): string[] {
    return searchTags.filter((tag) => !this.searchTags.includes(tag));
  }
}
