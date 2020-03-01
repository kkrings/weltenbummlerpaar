/**
 * Alert service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


/**
 * Service for handling errors thrown by the HTTP client
 */
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  /**
   * Construct alert service.
   */
  constructor() { }

  /**
   * Handle HTTP errors.
   *
   * Handle HTTP errors that can occur when requesting data from the back-end
   * server and throw a user-friendly error message.
   *
   * @param error
   *   HTTP error response
   *
   * @returns
   *   User-friendly error message
   */
  handleError(error: HttpErrorResponse) {
    console.error(error);

    return throwError(
        'Ups, da ist wohl etwas schief gegangen. ' +
        'Der Backendserver mag nicht mit mir reden. ' +
        'Versuche es später noch einmal.');
  }
}
