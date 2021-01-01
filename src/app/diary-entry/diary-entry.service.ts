/**
 * Diary entry service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DiaryEntry } from './diary-entry.model';
import { HttpAlertService } from '../shared/http-alert.service';
import { environment } from '../../environments/environment';


/**
 * Diary entry service
 *
 * This service interacts with the back-end server and enables the application
 * to get, create, delete, and update diary entries.
 */
@Injectable({
  providedIn: 'root'
})
export class DiaryEntryService {
  /**
   * Query for sorting diary entries in descending order based on their
   * creation dates
   */
  private static sortDiaryEntriesQuery = 'options[sort][createdAt]=-1';

  /**
   * Construct the diary entry service.
   *
   * @param http
   *   Enables the communication with the back-end server.
   * @param httpAlertService
   *   Handles failed HTTP requests.
   */
  constructor(
      private http: HttpClient,
      private httpAlertService: HttpAlertService) { }

  /**
   * Get a list of all diary entries in descending order from the back-end
   * server.
   *
   * @returns
   *   Diary entries
   */
  getEntries(): Observable<DiaryEntry[]> {
    const query = DiaryEntryService.sortDiaryEntriesQuery;

    return this.http
        .get<DiaryEntry[]>(`${environment.baseurl}/db/entries?${query}`)
        .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * Find diary entries on back-end server given a list of tags.
   *
   * @param tags
   *   List of tags
   *
   * @returns
   *   Found diary entries
   */
  findEntries(tags: string[]): Observable<DiaryEntry[]> {
    let query = DiaryEntryService.sortDiaryEntriesQuery;

    if (tags.length > 0) {
      const filter = tags.map(tag => `filter[tags][$all][]=${tag}`).join('&');
      query = `${filter}&${query}`;
    }

    return this.http
        .get<DiaryEntry[]>(`${environment.baseurl}/db/entries?${query}`)
        .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * Get a diary entry from the back-end server given its ID.
   *
   * @param entryId
   *   Diary entry's ID
   *
   * @returns
   *   Diary entry
   */
  getEntry(entryId: string): Observable<DiaryEntry> {
    return this.http
        .get<DiaryEntry>(`${environment.baseurl}/db/entries/${entryId}`)
        .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * Save a new diary entry to the back-end server.
   *
   * @param diaryEntry
   *   New diary entry
   *
   * @returns
   *   The saved diary entry
   */
  saveEntry(diaryEntry: DiaryEntry): Observable<DiaryEntry> {
    return this.http
        .post<DiaryEntry>(`${environment.baseurl}/db/entries`, {
          title: diaryEntry.title,
          locationName: diaryEntry.locationName,
          body: diaryEntry.body,
          images: diaryEntry.images,
          tags: diaryEntry.tags
        })
        .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * Update a diary entry on the back-end server.
   *
   * @param diaryEntry
   *   Diary entry
   *
   * @returns
   *   The updated diary entry
   */
  updateEntry(diaryEntry: DiaryEntry): Observable<DiaryEntry> {
    return this.http
        .put<DiaryEntry>(
            `${environment.baseurl}/db/entries/${diaryEntry._id}`, {
              title: diaryEntry.title,
              locationName: diaryEntry.locationName,
              body: diaryEntry.body,
              images: diaryEntry.images,
              tags: diaryEntry.tags
            })
        .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * Delete a diary entry from the back-end server given its ID.
   *
   * @param entryId
   *   Diary entry's ID
   *
   * @returns
   *   The deleted diary entry
   */
  deleteEntry(entryId: string): Observable<DiaryEntry> {
    return this.http
        .delete<DiaryEntry>(`${environment.baseurl}/db/entries/${entryId}`)
        .pipe(catchError(this.httpAlertService.handleError));
  }
}
