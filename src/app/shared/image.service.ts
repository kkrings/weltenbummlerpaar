/**
 * Image service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Image } from './image.model';
import { HttpAlertService } from './http-alert.service';
import { environment } from '../../environments/environment';


/**
 * Image service
 *
 * This service enables the application to upload, update, or delete images to,
 * on, or from the back-end server, respectively.
 */
@Injectable({
  providedIn: 'root'
})
export class ImageService {
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
    return `${environment.baseurl}/images/${image._id}.jpg`;
  }

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
      private httpAlertService: HttpAlertService) { }

  /**
   * Upload an image to the back-end server.
   *
   * @param imageFormData
   *   Form data representing the image
   *
   * @returns
   *   The uploaded image
   */
  uploadImage(imageFormData: FormData): Observable<Image> {
    return this.http
        .post<Image>(`${environment.baseurl}/db/images/upload`, imageFormData)
        .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * Update an image on the back-end server given its ID.
   *
   * @param imageId
   *   Image's ID
   * @param imageFormData
   *   Form data representing the image's updates
   *
   * @returns
   *   The updated image
   */
  updateImage(imageId: string, imageFormData: FormData): Observable<Image> {
    return this.http
        .put<Image>(
            `${environment.baseurl}/db/images/${imageId}`, imageFormData)
        .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * Delete an image from the back-end server given its ID.
   *
   * @param imageId
   *   Image's ID
   *
   * @returns
   *   The deleted image
   */
  deleteImage(imageId: string): Observable<Image> {
    return this.http
        .delete<Image>(`${environment.baseurl}/db/images/${imageId}`)
        .pipe(catchError(this.httpAlertService.handleError));
  }
}
