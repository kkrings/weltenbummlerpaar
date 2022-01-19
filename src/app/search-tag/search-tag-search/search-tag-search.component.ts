import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faMinus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { merge, Observable, of, OperatorFunction, Subject } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { SearchTagService } from '../search-tag.service';
import { Alert, AlertType } from '../../http-alert/alert.model';
import { debounceTime } from '../../utils';

@Component({
  selector: 'app-search-tag-search',
  templateUrl: './search-tag-search.component.html',
  styleUrls: ['./search-tag-search.component.scss'],
})
export class SearchTagSearchComponent {
  searching = false;
  httpAlert = new Alert();
  searchForm: FormGroup;
  searchTags: string[] = [];
  searchTags$;
  searchIcon = faSearch;
  deselectIcon = faMinus;

  private searchTagsSource = new Subject<string[]>();
  private focusSource = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (
    searchTags$: Observable<string>
  ) => this.doSearch(searchTags$);

  constructor(
    formBuilder: FormBuilder,
    private searchTagService: SearchTagService
  ) {
    this.searchForm = formBuilder.group({
      searchTag: ['', Validators.required],
    });

    this.searchTags$ = this.searchTagsSource.asObservable();
  }

  onFocus(searchTags: string): void {
    if (this.searchForm.invalid) {
      this.focusSource.next(searchTags);
    }
  }

  onSubmit(): void {
    const { searchTag }: { searchTag: string } = this.searchForm.value;
    this.searchTags.push(searchTag);
    this.searchTagsSource.next(this.searchTags);
    this.searchForm.reset();
  }

  deselect(searchTag: string): void {
    this.searchTags = this.searchTags.filter((tag) => tag !== searchTag);
    this.searchTagsSource.next(this.searchTags);
  }

  private doSearch(searchTag$: Observable<string>): Observable<string[]> {
    return merge(searchTag$, this.focusSource).pipe(
      tap(() => (this.searching = true)),
      debounceTime(),
      distinctUntilChanged(),
      switchMap((tag) => this.handleSearch(tag)),
      map((searchTags) => this.removeSelected(searchTags)),
      tap(() => (this.searching = false))
    );
  }

  private handleSearch(searchTag: string): Observable<string[]> {
    return this.searchTagService.find(searchTag).pipe(
      tap(() => this.resetAlert()),
      catchError((alertType) => this.handleAlert(alertType))
    );
  }

  private handleAlert(alertType: AlertType): Observable<string[]> {
    this.httpAlert.alertType = alertType;
    return of([]);
  }

  private resetAlert(): void {
    this.httpAlert.alertType = AlertType.none;
  }

  private removeSelected(searchTags: string[]): string[] {
    return searchTags.filter((tag) => !this.searchTags.includes(tag));
  }
}
