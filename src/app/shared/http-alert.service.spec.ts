/**
 * Unit tests for HTTP alert service
 * @packageDocumentation
 */

import { HttpErrorResponse } from '@angular/common/http';

import { HttpAlertService } from './http-alert.service';


describe('HttpAlertService', () => {
  it('#handleError should return user-friendly client-side error', () => {
    const service = new HttpAlertService();

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
    const service = new HttpAlertService();

    const error = new HttpErrorResponse({
        error: new Error('This is a mock server-side error event.'),
        status: 500
    });

    service.handleError(error).subscribe(
      fail, (message: string) => expect(message)
          .toContain('Der Backendserver mag nicht mit mir reden.'));
  });

  it('#handleError should return user-friendly authorization error', () => {
    const service = new HttpAlertService();

    const error = new HttpErrorResponse({
        error: new Error('This is a mock authorization error event.'),
        status: 401
    });

    service.handleError(error).subscribe(
      fail, (message: string) => expect(message).toContain(
          'Der Backendserver sagt, dass ich keine Erlaubnis habe dies zu tun.'
      )
    );
  });
});
