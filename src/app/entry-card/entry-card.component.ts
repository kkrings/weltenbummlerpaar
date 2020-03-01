/**
 * Diary entry card component
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { DiaryEntry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';


/**
 * Diary entry card component
 *
 * Present diary entry via a Bootstrap card.
 */
@Component({
  selector: 'app-entry-card',
  templateUrl: './entry-card.component.html',
  styleUrls: ['./entry-card.component.scss']
})
export class EntryCardComponent implements OnInit {
  /**
   * Loaded diary entry
   */
  diaryEntry: DiaryEntry;

  /**
   * Alert message that is shown in case of HTTP errors
   */
  alertMessage: string;

  /**
   * Construct entry card component.
   *
   * @param route
   *   Diary entry's ID will be extracted from activated route.
   * @param entryService
   *   Diary entry loading service
   */
  constructor(
      private route: ActivatedRoute,
      private entryService: EntryService) { }

  /**
   * Subscribe to loaded diary entry when component is initialized.
   */
  ngOnInit() {
    this.route.paramMap
        .pipe(switchMap((params: ParamMap) => {
          return this.entryService.getEntry(params.get('entryId') as string);
        }))
        .subscribe(
            (diaryEntry: DiaryEntry) => this.diaryEntry = diaryEntry,
            (error: string) => this.alertMessage = error);
  }
}
