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
   * Upload a new image to the back-end server.
   *
   * @param image
   *   Image file
   * @param description
   *   Image's description
   *
   * @returns
   *   The uploaded image
   */
  uploadImage(image: File, description: string): Observable<Image> {
    // upload is based on multipart/form-data
    const formData = new FormData();

    formData.set('image', image);
    formData.set('description', description);

    return this.http
        .post<Image>(`${environment.baseurl}/db/images/upload`, formData)
        .pipe(catchError(this.httpAlertService.handleError));
  }

  /**
   * Compress the given image inside a web worker.
   *
   * @param image
   *   Image file
   *
   * @returns
   *   The compressed image
   */
  compressImage(image: File): Observable<File> {
    const compImage = new Subject<File>();

    if (typeof Worker !== 'undefined') {
      const compWorker = new Worker('./image.worker', {type: 'module'});

      compWorker.onmessage = ({data}) => {
        const file = new File([data], image.name);
        compImage.next(file);
      };

      compWorker.onerror = (error) => {
        compImage.error(error);
      };

      const imageReader = new FileReader();

      imageReader.onload = () => {
        compWorker.postMessage(imageReader.result);
      };

      imageReader.onerror = () => {
        compImage.error(imageReader.error);
      };

      imageReader.readAsDataURL(image);
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
