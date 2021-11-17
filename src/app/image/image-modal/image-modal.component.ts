/**
 * Image modal component
 * @packageDocumentation
 */

import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntry } from '../../diary-entry/diary-entry.model';
import { Image } from '../image.model';

/**
 * Image modal component
 *
 * This component is a Bootstrap modal that allows the admin user to upload,
 * update, or delete images, which are linked to a diary entry, to, on, or from
 * the back-end server respectively.
 */
@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent {
  /**
   * Injected diary entry; update diary entry's images or add new images to it.
   */
  @Input() diaryEntry: DiaryEntry = {
    id: '',
    title: '',
    location: '',
    body: '',
    images: [],
    searchTags: [],
    createdAt: '',
    updatedAt: '',
  };

  /**
   * Disable the modal's close buttons when talking to the back-end server.
   */
  disableClose = false;

  /**
   * Construct the image modal component.
   *
   * @param modal
   *   Holds a reference to the modal.
   */
  constructor(private modal: NgbActiveModal) {}

  /**
   * Close the modal.
   */
  close(): void {
    this.modal.close();
  }

  /**
   * Update the injected diary entry.
   *
   * @param entry
   *   Updated diary entry
   */
  updateEntry(entry: DiaryEntry): void {
    Object.assign(this.diaryEntry, entry);
    this.diaryEntry.previewImage = entry.previewImage;
  }
}
