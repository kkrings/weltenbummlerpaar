/**
 * Diary entry service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DiaryEntry } from './entry.model';
import { AlertService } from './alert.service';
import { environment } from '../../environments/environment';


/**
 * Service for loading diary entries from back-end server
 */
@Injectable({
  providedIn: 'root',
})
export class EntryService {
  /**
   * Construct diary entry service.
   *
   * @param http
   *   Allows to communicate with the back-end server.
   * @param alertService
   *   Handles failed HTTP requests.
   */
  constructor(
      private http: HttpClient,
      private alertService: AlertService) { }

  /**
   * Load list of all diary entries from back-end server.
   *
   * @returns
   *   Diary entries
   */
  getEntries(): Observable<DiaryEntry[]> {
    return this.http
        .get<DiaryEntry[]>(`${environment.baseurl}/db/entries`)
        .pipe(catchError(this.alertService.handleError));
  }

  /**
   * Load diary entry from back-end server given its ID.
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
        .pipe(catchError(this.alertService.handleError));
  }
}
