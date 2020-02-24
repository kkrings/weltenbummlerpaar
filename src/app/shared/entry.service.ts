import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DiaryEntry } from './entry.model';
import { ENTRIES } from './mock-entries';

/**
 * Load diary entries from server.
 */
@Injectable({
  providedIn: 'root'
})
export class EntryService {
  /**
   * Construct diary entry service.
   */
  constructor() { }
  // constructor(private http: HttpClient) { }

  /**
   * Get list of all diary entries
   *
   * @returns
   *   Diary entries
   */
  getEntries(): Observable<DiaryEntry[]> {
    return of(ENTRIES).pipe(delay(5000));
  }

  /**
   * Get diary entry given its ID.
   *
   * @param entryId
   *   Diary entry's ID
   *
   * @returns
   *   Diary entry
   */
  getEntry(entryId: string): Observable<DiaryEntry> {
    return of(ENTRIES.filter(diaryEntry => diaryEntry._id === entryId)[0])
        .pipe(delay(5000));
  }
}
