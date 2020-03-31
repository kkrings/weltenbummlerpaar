/**
 * Diary entry card component
 * @packageDocumentation
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryService } from '../shared/diary-entry.service';
import { DiaryEntry } from '../shared/diary-entry.model';
import { ImageService } from '../shared/image.service';
import { Image } from '../shared/image.model';

import {
  DiaryEntryModalComponent
} from '../diary-entry-modal/diary-entry-modal.component';


/**
 * Diary entry card component
 *
 * This component presents a diary entry's brief version to the user via
 * Bootstrap's card component.
 */
@Component({
  selector: 'app-diary-entry-card',
  templateUrl: './diary-entry-card.component.html',
  styleUrls: ['./diary-entry-card.component.scss']
})
export class DiaryEntryCardComponent implements OnInit {
  /**
   * Injected diary entry
   */
  @Input() diaryEntry: DiaryEntry;

  /**
   * If the admin user clicks the delete button, notify the parent comment that
   * the diary entry was deleted from the back-end server.
   */
  @Output() entryDeleted = new EventEmitter<DiaryEntry>();

  /**
   * Show a spinner instead of the delete button and disable the button that
   * opens the full diary entry in a modal when the delete request is being
   * processed.
   */
  showSpinner = false;

  /**
   * Construct the diary entry card component.
   *
   * @param modalService
   *   Service for showing the full diary entry via Bootstrap's modal component
   * @param diaryEntryService
   *   Service for deleting the diary entry on the back-end server
   */
  constructor(
      private modalService: NgbModal,
      private diaryEntryService: DiaryEntryService) { }

  /**
   * Intialize the diary entry card component.
   */
  ngOnInit(): void { }

  /**
   * Get image's URL.
   *
   * @param image
   *   Image
   *
   * @returns
   *   Image's URL
   */
  getImageUrl(image: Image): string {
    return ImageService.getImageUrl(image);
  }

  /**
   * Brief version of diary entry's body
   *
   * @returns
   *   Brief version of diary entry's body
   */
  getDiaryEntryBodyBrief(): string {
    // maximum number of characters
    const briefLength = 150;

    let body = this.getFirstParagraph();
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
   * @returns
   *   Diary entry's first paragraph
   */
  private getFirstParagraph(): string {
    let paragraph = '';

    const match = /<p>(?<paragraph>.*)<\/p>/.exec(this.diaryEntry.body);
    if (match && match.groups && match.groups.paragraph) {
      paragraph = match.groups.paragraph;
    } else {
      paragraph = this.diaryEntry.body;
    }

    return paragraph;
  }

  /**
   * Open Bootstrap modal that shows the full diary entry.
   */
  openModal(): void {
    const modal = this.modalService.open(DiaryEntryModalComponent);
    modal.componentInstance.diaryEntry = this.diaryEntry;
  }

  /**
   * Delete diary entry
   *
   * Delete the diary entry from the back-end server and notify the parent
   * component about its deletion.
   */
  deleteEntry(): void {
    // show spinner while the delete request is being processed
    this.showSpinner = true;

    this.diaryEntryService.deleteEntry(this.diaryEntry._id).subscribe(
      (diaryEntry: DiaryEntry) => {
        this.entryDeleted.emit(diaryEntry);
        this.showSpinner = false;
      },
      (error: string) => {
        // @TODO this will most likely be replaced with a message service based
        // on Bootstrap's toasts
        console.error(error);
        this.showSpinner = false;
      }
    );
  }
}
