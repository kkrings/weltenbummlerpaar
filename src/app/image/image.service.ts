/**
 * Image service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Image } from './image.model';
import { HttpAlertService } from '../shared/http-alert.service';
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
   * Compress the given image inside a web worker.
   *
   * @param image
   *   Path to image (data URL)
   *
   * @returns
   *   Compressed image
   */
  compressImage(image: string): Observable<string> {
    const compImage = new Subject<string>();

    if (typeof Worker !== 'undefined') {
      const compWorker = new Worker('./image.worker', {type: 'module'});

      compWorker.onmessage = ({data}) => {
        compImage.next(data);
      };

      compWorker.onerror = () => {
        compImage.error(new Error('Image compression failed.'));
      };

      compWorker.postMessage(image);
    } else {
      compImage.error(
          `Cannot compress ${image} because web workers are not ` +
          'supported in this environment.');
    }

    return compImage;
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
