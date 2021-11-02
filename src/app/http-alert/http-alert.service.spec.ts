/**
 * Unit tests for HTTP alert service
 * @packageDocumentation
 */

import { HttpErrorResponse } from '@angular/common/http';

import { HttpAlertService } from './http-alert.service';
import { AlertType } from './alert.model';

describe('HttpAlertService', () => {
  it('#handleError should return client-side alert', () => {
    const service = new HttpAlertService();

    const error = new HttpErrorResponse({
      error: new ErrorEvent('MockClientSideErrorEvent', {
        message: 'This is a mock client-side error event.',
      }),
    });

    service
      .handleError(error)
      .subscribe(fail, (alertType) =>
        expect(alertType).toEqual(AlertType.client)
      );
  });

  it('#handleError should return server-side alert', () => {
    const service = new HttpAlertService();

    const error = new HttpErrorResponse({
      error: new Error('This is a mock server-side error event.'),
      status: 500,
    });

    service
      .handleError(error)
      .subscribe(fail, (alertType) =>
        expect(alertType).toEqual(AlertType.server)
      );
  });

  it('#handleError should return permission-denied alert', () => {
    const service = new HttpAlertService();

    const error = new HttpErrorResponse({
      error: new Error('This is a mock authorization error event.'),
      status: 401,
    });

    service
      .handleError(error)
      .subscribe(fail, (alertType) =>
        expect(alertType).toEqual(AlertType.permission)
      );
  });
});
