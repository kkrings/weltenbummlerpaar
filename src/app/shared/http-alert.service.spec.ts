/**
 * Unit tests for HTTP alert service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { HttpAlertService } from './http-alert.service';


describe('HttpAlertService', () => {
  let service: HttpAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HttpAlertService]});
    service = TestBed.inject(HttpAlertService);
  });

  it('#handleError should return user-friendly client-side error', () => {
    const error = new HttpErrorResponse({
        error: new ErrorEvent('MockClientSideErrorEvent', {
          message: 'This is a mock client-side error event.'
        })
    });

    service.handleError(error).subscribe(
      fail, (message: string) => expect(message)
          .toContain('Ich kann nicht mit dem Backendserver reden.'));
  });

  it('#handleError should return user-friendly server-side error', () => {
    const error = new HttpErrorResponse({
        error: new Error('This is a mock server-side error event.'),
        status: 500
    });

    service.handleError(error).subscribe(
      fail, (message: string) => expect(message)
          .toContain('Der Backendserver mag nicht mit mir reden.'));
  });
});
