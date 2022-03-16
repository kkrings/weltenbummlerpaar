/**
 * Search tag service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { HttpAlertService } from '../http-alert/http-alert.service';

/**
 * Search tag service
 *
 * This service interacts with the back-end server and enables the application
 * to search diary entry search tags.
 */
@Injectable({
  providedIn: 'root',
})
export class SearchTagService {
  /**
   * Construct the search tag service.
   *
   * @param http
   *   Enables the communication with the back-end server.
   * @param httpAlertService
   *   Handles failed HTTP requests.
   */
  constructor(
    private http: HttpClient,
    private httpAlertService: HttpAlertService
  ) {}

  /**
   * Search for diary entry search tags on the back-end server given a search
   * string.
   *
   * @param searchTag
   *   Search string
   *
   * @returns
   *   Found diary entry search tags
   */
  find(searchTag: string): Observable<string[]> {
    const url = new URL(
      `rest/search-tags?searchTag=${searchTag}`,
      environment.baseurl
    );

    return this.http
      .get<string[]>(url.href)
      .pipe(catchError(this.httpAlertService.handleError));
  }
}
