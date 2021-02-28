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
   * URL to entry end point
   */
  #entryUrl = `${environment.baseurl}/db/entries`;

  /**
  /**
   * Construct the diary entry service.
   *
   * @param http
   *   Enables the communication with the back-end server.
   * @param httpAlertService
   *   Handles failed HTTP requests.
   */
  constructor(private http: HttpClient, private httpAlertService: HttpAlertService) { }

  /**
   * Count the number of diary entries available in total on the back-end
   * server, given a list of search tags.
   *
   * @param tags
   *   List of search tags
   *
   * @returns
   *   Number of diary entries available in total
   */
  countEntries(tags: string[] = []): Observable<number> {
    return this.http
        .get<number>(this.getSearchUrl(tags, true))
        .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * Search for diary entries on the back-end server given a list of search tags.
   *
   * @param tags
   *   List of search tags
   * @param skip
   *   Skip the given number of diary entries
   * @param limit
   *   If larger than zero, limit the number of diary entries
   *
   * @returns
   *   Found diary entries
   */
  getEntries(tags: string[] = [], skip = 0, limit = -1): Observable<DiaryEntry[]> {
    let url = this.getSearchUrl(tags);

    if (skip > 0) {
      url = `${url}&skip=${skip}`;
    }

    if (limit > 0) {
      url = `${url}&limit=${limit}`;
    }

    return this.http.get<DiaryEntry[]>(url).pipe(catchError(this.httpAlertService.handleError));
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
        .get<DiaryEntry>(`${this.#entryUrl}${entryId}`)
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
        .post<DiaryEntry>(this.#entryUrl, {
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
            `${this.#entryUrl}${diaryEntry._id}`, {
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
        .delete<DiaryEntry>(`${this.#entryUrl}/${entryId}`)
        .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * URL for searching for diary entries on the back-end server.
   *
   * @param tags
   *   List of search tags
   * @param count
   *   If `true`, return the endpoint for getting the number of available diary
   *   entries.
   *
   * @returns
   *   Search URL
   */
  private getSearchUrl(tags: string[] = [], count = false): string {
    const url = count ? `${this.#entryUrl}/count` : this.#entryUrl;
    const query = tags.map(tag => `tags[$all][]=${tag}`).join('&');

    return query.length > 0 ? `${url}?${query}` : url;
  }
}
