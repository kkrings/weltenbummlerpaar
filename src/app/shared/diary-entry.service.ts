/**
 * Diary entry service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DiaryEntry } from './diary-entry.model';
import { HttpAlertService } from './http-alert.service';
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
    return this.http
        .get<DiaryEntry[]>(
            `${environment.baseurl}/db/entries?options[sort][createdAt]=-1`)
        .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * Get diary entry from the back-end server given its ID.
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
   * Save a new diary entry on the back-end server.
   *
   * @param diaryEntry
   *   New diary entry
   *
   * @returns
   *   The saved diary entry
   */
  saveEntry(diaryEntry: DiaryEntry): Observable<DiaryEntry> {
    return this.http
        .post<DiaryEntry>(`${environment.baseurl}/db/entries`, diaryEntry)
        .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * Update diary entry on the back-end server.
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
            `${environment.baseurl}/db/entries/${diaryEntry._id}`, diaryEntry)
        .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * Delete diary entry from the back-end server given its ID.
   *
   * @param entryId
   *   Diary entry's ID
   *
   * @returns
   *   Deleted diary entry
   */
  deleteEntry(entryId: string): Observable<DiaryEntry> {
    return this.http
        .delete<DiaryEntry>(`${environment.baseurl}/db/entries/${entryId}`)
        .pipe(catchError(this.httpAlertService.handleError));
  }
}
