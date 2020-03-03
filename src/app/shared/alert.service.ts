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
  providedIn: 'root'
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
    // will hold user-friendly error message
    let reason = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      console.error(
          'HTTP request failed due to client-side error: ' +
          `message: ${error.error.message}`);

      reason = 'Ich kann nicht mit dem Backendserver reden.';
    } else {
      // server-side error
      console.error(
          'HTTP request failed due to server-side error: ' +
          `status: ${error.status}, body: ${error.error}`);

      reason = 'Der Backendserver mag nicht mit mir reden.';
    }

    return throwError(
        `Ups, da ist wohl etwas schief gegangen: ${reason}` +
        ' Versuche es später noch einmal.');
  }
}
