/**
 * Diary entry search service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { DiaryEntry } from '../diary-entry.model';
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
  providedIn: 'root',
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
  private diaryEntrySource = new BehaviorSubject<DiaryEntrySearchResult>({
    searchTags: [],
    entries: [],
    numEntries: -1,
  });

  /**
   * Source for emitting a search's status via `searching$`
   */
  private searchingSource = new BehaviorSubject<boolean>(false);

  /**
   * Subscription to search tags observable
   */
  private onSearchTags = Subscription.EMPTY;

  /**
   * Subscription to found diary entries
   */
  private onSearchResult = Subscription.EMPTY;

  /**
   * Initialize diary entry search service.
   *
   * @param diaryEntryService
   *   Service for searching for diary entries on the back-end server
   * @param config
   *   Diary entry search configuration
   */
  constructor(
    private diaryEntryService: DiaryEntryService,
    private config: DiaryEntrySearchConfig
  ) {
    this.diaryEntries$ = this.diaryEntrySource.asObservable();
    this.searching$ = this.searchingSource.asObservable();
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
  subscribeToSearchTags(tags$: Observable<string[]>): void {
    this.unsubscribeFromSearchTags();

    this.onSearchTags = tags$.subscribe(() => this.searchingSource.next(true));

    const diaryEntrySearch$ = tags$.pipe(
      switchMap((tags) => this.searchEntries(tags))
    );

    this.onSearchResult = diaryEntrySearch$.subscribe(
      (result) => this.emitResult(result),
      (error) => this.emitError(error)
    );
  }

  /**
   * Unsubscribe from search tags observable.
   *
   * When this method is called, this service stops listening for emitted diary
   * entry search tags.
   */
  unsubscribeFromSearchTags(): void {
    this.onSearchTags.unsubscribe();
    this.onSearchResult.unsubscribe();
  }

  /**
   * Load more diary entries from the back-end server.
   *
   * @param tags
   *   Use these search tags for the loading.
   * @param skip
   *   Skip the specified number of (already loaded) diary entries.
   *
   * @returns
   *   List of loaded diary entries
   */
  moreEntries(tags: string[], skip: number): Observable<DiaryEntry[]> {
    return this.getEntries(tags, skip);
  }

  private emitResult(result: DiaryEntrySearchResult): void {
    this.searchingSource.next(false);
    this.diaryEntrySource.next(result);
  }

  private emitError(error: string): void {
    this.searchingSource.next(false);
    this.diaryEntrySource.error(error);
  }

  private searchEntries(tags: string[]): Observable<DiaryEntrySearchResult> {
    return forkJoin({
      entries: this.getEntries(tags),
      count: this.countEntries(tags),
    }).pipe(
      map(({ entries, count }) => ({
        searchTags: tags,
        entries: entries,
        numEntries: count,
      }))
    );
  }

  private getEntries(tags: string[], skip = 0): Observable<DiaryEntry[]> {
    const limit = this.config.limitNumEntries;
    return this.diaryEntryService.getEntries(tags, skip, limit);
  }

  private countEntries(tags: string[]): Observable<number> {
    return this.diaryEntryService.countEntries(tags);
  }
}
