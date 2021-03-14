/**
 * Diary entry search service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { DiaryEntry } from '../diary-entry.model';
import { DiaryEntrySearchNums } from './diary-entry-search-nums.model';
import { DiaryEntrySearchResult } from './diary-entry-search.model';
import { DiaryEntrySearchConfig } from './diary-entry-search.config';
import { DiaryEntryService } from '../diary-entry.service';

/**
 * Diary entry search service
 *
 * This service is responsible for triggering a search request for diary
 * entries on the back-end server whenever the user provides a new list of
 * search tags.
 *
 * On initialization, the service requests the latest diary entries from the
 * back-end server.
 */
@Injectable({
  providedIn: 'root'
})
export class DiaryEntrySearchService {
  /**
   * List of found diary entries
   */
  diaryEntries$: Observable<DiaryEntrySearchResult>;

  /**
   * Specifies if a search for diary entries is on-going.
   */
  searching$: Observable<boolean>;

  /**
   * Source for emitting a list of found diary entries via `diaryEntries$`
   */
  #diaryEntrySource = new BehaviorSubject<DiaryEntrySearchResult>(new DiaryEntrySearchResult());

  /**
   * Source for emitting a search's status via `searching$`
   */
  #searchingSource = new BehaviorSubject<boolean>(false);

  /**
   * Subscription to search tags observable
   */
  #onSearchTags = Subscription.EMPTY;

  /**
   * Subscription to found diary entries
   */
  #onSearchResult = Subscription.EMPTY;

  /**
   * Initialize diary entry search service.
   *
   * @param diaryEntryService
   *   Service for searching for diary entries on the back-end server
   * @param config
   *   Diary entry search configuration
   */
  constructor(private diaryEntryService: DiaryEntryService, private config: DiaryEntrySearchConfig) {
    this.diaryEntries$ = this.#diaryEntrySource.asObservable();
    this.searching$ = this.#searchingSource.asObservable();
  }

  /**
   * Subscribe to search tags observable.
   *
   * Whenever new search tags are emitted by `tags$`, a new search request is
   * send to the back-end server. An already on-going search is canceled.
   *
   * @param tags$
   *   Search tags observable
   */
  subscribeToSearchTags(tags$: Observable<string>): void {
    this.unsubscribeFromSearchTags();

    this.#onSearchTags = tags$.subscribe(_ => this.#searchingSource.next(true));

    const diaryEntrySearch$ = tags$.pipe(
        map(tags => this.splitSearchTags(tags)),
        debounceTime(this.config.waitForTags),
        distinctUntilChanged(),
        switchMap(tags => this.searchEntries(tags)));

    this.#onSearchResult = diaryEntrySearch$.subscribe(
        result => this.emitResult(result),
        error => this.emitError(error));
  }

  /**
   * Unsubscribe from search tags observable.
   *
   * When this method is called, this service stops listening for emitted diary
   * entry search tags.
   */
  unsubscribeFromSearchTags(): void {
    this.#onSearchTags.unsubscribe();
    this.#onSearchResult.unsubscribe();
  }

  private splitSearchTags(tags: string): string[] {
    return tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  }

  private emitResult(result: DiaryEntrySearchResult): void {
    this.#searchingSource.next(false);
    this.#diaryEntrySource.next(result);
  }

  private emitError(error: string): void {
    this.#searchingSource.next(false);
    this.#diaryEntrySource.error(error);
  }

  private searchEntries(tags: string[]): Observable<DiaryEntrySearchResult> {
    const search = forkJoin({
      entries: this.diaryEntryService.getEntries(tags, 0, this.config.limitNumEntries),
      count: this.diaryEntryService.countEntries(tags)
    });

    return search.pipe(map(({entries, count}) => this.searchResult(tags, entries, count)));
  }

  private searchResult(tags: string[], entries: DiaryEntry[], count: number): DiaryEntrySearchResult {
    const numEntries: DiaryEntrySearchNums = {loaded: entries.length, total: count};
    return new DiaryEntrySearchResult(tags, entries, numEntries);
  }
}
