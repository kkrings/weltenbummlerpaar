import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { Alert, AlertType } from '../../../http-alert/alert.model';
import { DiaryEntry } from '../../diary-entry.model';
import { DiaryEntrySearchResult } from '../diary-entry-search.model';
import { DiaryEntrySearchService } from '../diary-entry-search.service';

@Component({
  selector: 'app-diary-entry-load-more',
  templateUrl: './diary-entry-load-more.component.html',
  styleUrls: ['./diary-entry-load-more.component.scss'],
})
export class DiaryEntryLoadMoreComponent implements OnInit, OnDestroy {
  @Output() moreEntries = new EventEmitter<DiaryEntry[]>();

  searching = false;
  loading = false;
  numEntriesTotal = 0;
  numEntriesLoaded = 0;
  httpAlert = new Alert();

  private searchTags: string[] = [];
  private onSearching = Subscription.EMPTY;
  private onDiaryEntries = Subscription.EMPTY;

  constructor(private diaryEntrySearchService: DiaryEntrySearchService) {}

  ngOnInit(): void {
    this.onDiaryEntries = this.diaryEntrySearchService.diaryEntries$.subscribe(
      (result) => this.resetSearch(result)
    );

    this.onSearching = this.diaryEntrySearchService.searching$.subscribe(
      (searching) => (this.searching = searching)
    );
  }

  ngOnDestroy(): void {
    this.onDiaryEntries.unsubscribe();
    this.onSearching.unsubscribe();
  }

  loadMoreEntries(): void {
    this.loading = true;

    const newSearch$ = this.diaryEntrySearchService.searching$.pipe(
      filter((searching) => searching),
      tap(() => (this.loading = false))
    );

    this.diaryEntrySearchService
      .moreEntries(this.searchTags, this.numEntriesLoaded)
      .pipe(takeUntil(newSearch$))
      .subscribe(
        (entries) => this.handleEntries(entries),
        (alertType) => this.handleError(alertType)
      );
  }

  private handleEntries(entries: DiaryEntry[]): void {
    this.moreEntries.emit(entries);
    this.numEntriesLoaded += entries.length;
    this.loading = false;
  }

  private handleError(alertType: AlertType): void {
    this.httpAlert.alertType = alertType;
    this.loading = false;
  }

  private resetSearch(searchResult: DiaryEntrySearchResult): void {
    this.searchTags = searchResult.searchTags;
    this.numEntriesTotal = searchResult.numEntries;
    this.numEntriesLoaded = searchResult.entries.length;
  }
}
