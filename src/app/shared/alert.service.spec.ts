/**
 * Unit tests for alert service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertService } from './alert.service';


describe('AlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('#handleError should return user-friendly client-side error', () => {
    const service: AlertService = TestBed.get(AlertService);

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
    const service: AlertService = TestBed.get(AlertService);

    const error = new HttpErrorResponse({
        error: new Error('This is a mock server-side error event.'),
        status: 500
    });

    service.handleError(error).subscribe(
      fail, (message: string) => expect(message)
          .toContain('Der Backendserver mag nicht mit mir reden.'));
  });
});
