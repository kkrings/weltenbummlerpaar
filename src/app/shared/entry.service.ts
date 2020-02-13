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

  getEntries(): Observable<DiaryEntry[]> {
    return of(ENTRIES);
  }

  getEntry(entryId: string): Observable<DiaryEntry> {
    return of(ENTRIES.filter(diaryEntry => diaryEntry._id === entryId)[0]);
  }
}
