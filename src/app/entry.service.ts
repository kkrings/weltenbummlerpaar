import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DiaryEntry {
  _id: string;
  title: string;
  body: string;
  country: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http: HttpClient) { }

  getEntries(): Observable<DiaryEntry[]> {
    return this.http.get<DiaryEntry[]>('assets/entries.json');
  }
}
