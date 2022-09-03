/**
 * Unit tests for authentication service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { AlertType } from '../http-alert/alert.model';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('test successful login and logout of admin user', () => {
    authService.login('username', 'password').subscribe((success: boolean) => {
      // test login
      expect(success).toBeTrue();
      expect(authService.isLoggedIn).toBeTrue();
      // test logout
      authService.logout();
      expect(authService.isLoggedIn).toBeFalse();
    }, fail);

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/auth/login`
    );

    expect(testRequest.request.method).toMatch('POST');
    expect(testRequest.request.body.username).toMatch('username');
    expect(testRequest.request.body.password).toMatch('password');

    testRequest.flush({ accessToken: 'mockJWT' });
  });

  it('test unsuccessfl login of admin user', () => {
    authService
      .login('username', 'password')
      .subscribe(fail, (alertType: AlertType) =>
        expect(alertType).toEqual(AlertType.permission)
      );

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/auth/login`
    );

    testRequest.flush('mock not-authorized response', {
      status: 401,
      statusText: 'Authentication failed',
    });
  });

  afterEach(() => httpTestingController.verify());
});
