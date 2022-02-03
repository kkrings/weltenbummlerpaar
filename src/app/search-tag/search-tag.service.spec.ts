import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SearchTagService } from './search-tag.service';
import { HttpAlertService } from '../http-alert/http-alert.service';
import { AlertType } from '../http-alert/alert.model';
import { environment } from '../../environments/environment';

describe('SearchTagService', () => {
  let service: SearchTagService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchTagService, HttpAlertService],
    });

    service = TestBed.inject(SearchTagService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('#find should find search tags', () => {
    const searchTag = 'some search tag';

    service
      .find(searchTag)
      .subscribe((searchTags) => expect(searchTags).toEqual([searchTag]), fail);

    const url = new URL(
      `rest/search-tags?searchTag=${searchTag}`,
      environment.baseurl
    );

    const testRequest = controller.expectOne(url.href);
    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush([searchTag]);
  });

  it('#find should return alert message', () => {
    const searchTag = 'some search tag';

    service
      .find(searchTag)
      .subscribe(fail, (alertType: AlertType) =>
        expect(alertType).toEqual(AlertType.server)
      );

    const url = new URL(
      `rest/search-tags?searchTag=${searchTag}`,
      environment.baseurl
    );

    const testRequest = controller.expectOne(url.href);
    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server',
    });
  });

  afterEach(() => {
    controller.verify();
  });
});
