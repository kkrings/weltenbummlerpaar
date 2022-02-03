import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpAlertService } from '../http-alert/http-alert.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchTagService {
  constructor(
    private http: HttpClient,
    private httpAlertService: HttpAlertService
  ) {}

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
