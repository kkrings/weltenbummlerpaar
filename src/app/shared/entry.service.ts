import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DiaryEntry } from './entry.model';
import { ENTRIES } from './mock-entries';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  // constructor(private http: HttpClient) { }
  constructor() { }

  /**
   * Get list of all diary entries
   * @returns Diary entries
   */
  getEntries(): Observable<DiaryEntry[]> {
    return of(ENTRIES);
  }

  /**
   * Get diary entry given its ID.
   * @param entryId Diary entry's ID
   * @returns Diary entry
   */
  getEntry(entryId: string): Observable<DiaryEntry> {
    return of(ENTRIES.filter(diaryEntry => diaryEntry._id === entryId)[0]);
  }
}
