/**
 * Image service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Image } from './image.model';
import { DiaryEntry } from '../diary-entry/diary-entry.model';
import { HttpAlertService } from '../http-alert/http-alert.service';
import { environment } from '../../environments/environment';

/**
 * Image service
 *
 * This service enables the application to upload, update, or delete images to,
 * on, or from the back-end server, respectively.
 */
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  /**
   * Construct the image service.
   *
   * @param http
   *   Service for sending HTTP requests to the back-end server
   * @param httpAlertService
   *   Service for handling HTTP errors
   */
  constructor(
    private http: HttpClient,
    private httpAlertService: HttpAlertService
  ) {}

  /**
   * Get image's URL.
   *
   * @param image
   *   Image object
   *
   * @returns
   *   Image's URL
   */
  static getImageUrl(image: Image): string {
    return `${environment.baseurl}/image-uploads/${image.id}.jpg`;
  }

  /**
   * Upload a new image to the back-end server.
   *
   * @param entryId
   *   Link the uploaded image to the given diary entry.
   * @param image
   *   New image that should be uploaded
   *
   * @returns
   *   The updated diary entry
   */
  uploadImage(entryId: string, image: Image): Observable<DiaryEntry> {
    // upload is based on multipart/form-data
    const formData = new FormData();

    if (!image.file) {
      return throwError('No image file was specified for the upload.');
    }

    formData.set('imageUpload', image.file);
    formData.set('description', image.description);

    const url = `${environment.baseurl}/diary-entries/${entryId}/images`;

    return this.http
      .post<DiaryEntry>(url, formData)
      .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * Update an existing image on the back-end server.
   *
   * @param image
   *   Existing image that should be updated
   *
   * @returns
   *   The updated image
   */
  updateImage(image: Image): Observable<Image> {
    // upload is based on multipart/form-data
    const formData = new FormData();

    if (image.file) {
      formData.set('imageUpload', image.file);
    }

    formData.set('description', image.description);

    return this.http
      .patch<Image>(`${environment.baseurl}/images/${image.id}`, formData)
      .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * Delete an image from the back-end server given its ID.
   *
   * @param entryId
   *   ID of the diary entry the image is linked to
   * @param imageId
   *   Image's ID
   *
   * @returns
   *   The updated diary entry
   */
  deleteImage(entryId: string, imageId: string): Observable<DiaryEntry> {
    return this.http
      .delete<DiaryEntry>(
        `${environment.baseurl}/diary-entries/${entryId}/images/${imageId}`
      )
      .pipe(catchError(this.httpAlertService.handleError));
  }
}
