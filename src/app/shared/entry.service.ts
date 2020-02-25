/**
 * Diary entry service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DiaryEntry } from './entry.model';
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
   */
  constructor(private http: HttpClient) { }

  /**
   * Load list of all diary entries from back-end server.
   *
   * @returns
   *   Diary entries
   */
  getEntries(): Observable<DiaryEntry[]> {
    return this.http
        .get<DiaryEntry[]>(`${environment.backend}/entries`);
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
        .get<DiaryEntry>(`${environment.backend}/entries/${entryId}`);
  }
}
