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
 * This service enable the application to get images from back-end server.
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
   */
  constructor(
      private http: HttpClient,
      private httpAlertService: HttpAlertService) { }

  /**
   * Upload an image to the back-end server.
   *
   * @param image
   *   The back-end server's end point for image uploads expects content of
   *   type multipart/form-data.
   *
   * @returns
   *   The uploaded image
   */
  upload(image: FormData): Observable<Image> {
    return this.http
        .post<Image>(`${environment.baseurl}/db/images/upload`, image)
        .pipe(catchError(this.httpAlertService.handleError));
  }
}
