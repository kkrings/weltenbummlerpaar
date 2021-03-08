/**
 * HTTP alert service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AlertType } from './alert.model';


/**
 * HTTP alert service
 *
 * This service handles errors thrown by the HTTP client.
 */
@Injectable({
  providedIn: 'root'
})
export class HttpAlertService {
  /**
   * Handle HTTP errors.
   *
   * Handle HTTP errors that can occur when requesting data from the back-end
   * server and throw a user-friendly alert message, which is shown via the
   * HTTP alert message component.
   *
   * @param error
   *   HTTP error response
   *
   * @returns
   *   Alert type that corresponds to a user-friendly alert message
   */
  handleError(error: HttpErrorResponse): Observable<never> {
    // will hold user-friendly error message
    let alertType = AlertType.none;

    if (error.error instanceof ErrorEvent) {
      // client-side error
      console.error(
          'HTTP request failed due to client-side error: ' +
          `message: ${error.error.message}`);

      alertType = AlertType.client;
    } else {
      // server-side error
      console.error(
          'HTTP request failed due to server-side error: ' +
          `status: ${error.status}, body: ${error.error}`);

      if (error.status === 401) {
        alertType = AlertType.permission;
      } else {
        alertType = AlertType.server;
      }
    }

    return throwError(alertType);
  }
}
