/**
 * Diary entry grid component
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { DiaryEntry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { EntryModalComponent } from '../entry-modal/entry-modal.component';


/**
 * Diary entry grid component
 *
 * Present diary entries' brief versions via Bootstrap cards on a grid.
 */
@Component({
  selector: 'app-entry-grid',
  templateUrl: './entry-grid.component.html',
  styleUrls: ['./entry-grid.component.scss']
})
export class EntryGridComponent implements OnInit {
  /**
   * Loaded list of diary entries
   */
  diaryEntries: DiaryEntry[];

  /**
   * Alert message that is shown in case of HTTP errors
   */
  alertMessage: string;

  /**
   * Construct entry grid component.
   *
   * @param entryService
   *   Diary entry loading service
   */
  constructor(
      private entryService: EntryService,
      private modalService: BsModalService) { }

  /**
   * Subscribe to loaded list of diary entries when component is initialized.
   */
  ngOnInit() {
    this.entryService.getEntries().subscribe(
        (diaryEntries: DiaryEntry[]) => this.diaryEntries = diaryEntries,
        (error: string) => this.alertMessage = error);
  }

  /**
   * Specifies if diary entries are available for presentation.
   *
   * @returns
   *   Boolean specifying if list of loaded diary entries is not empty.
   */
  hasEntries(): boolean {
    return this.diaryEntries !== undefined && this.diaryEntries.length > 0;
  }

  /**
   * If the list of loaded diary entries is empty, the user is informed that no
   * diary entries have been added yet.
   *
   * @returns
   *   Boolean specifying if list of loaded diary entries is empty.
   */
  noEntries(): boolean {
    return this.diaryEntries !== undefined && this.diaryEntries.length === 0;
  }

  /**
   * Brief version of diary entry's body
   *
   * @param diaryEntry
   *   Diary entry
   *
   * @returns
   *   Brief version of diary entry's body
   */
  brief(diaryEntry: DiaryEntry): string {
    // maximum number of characters
    const briefLength = 150;

    let body = this.firstParagraph(diaryEntry.body);
    if (body.length > briefLength) {
      // truncate body after last word and append '...' such that brief body
      // has less than briefLength characters
      const dots = ' ...';
      body = body.substring(0, briefLength - dots.length + 1);
      const end = body.lastIndexOf(' ');
      body = body.substring(0, end) + dots;
    }

    return body;
  }

  /**
   * Extract first paragraph from diary entry's body.
   *
   * @param body
   *   Diary entry's body
   *
   * @returns
   *   Diary entry's first paragraph
   */
  private firstParagraph(body: string) {
    let paragraph = body;

    const match = /<p>(?<paragraph>.*)<\/p>/.exec(body);
    if (match) {
      paragraph = match.groups.paragraph;
    }

    return paragraph;
  }

  /**
   * Open modal that shows the diary entry's full body.
   *
   * @param diaryEntry
   *   Diary entry
   */
  openModal(diaryEntry: DiaryEntry) {
    this.modalService.show(EntryModalComponent);
  }
}
