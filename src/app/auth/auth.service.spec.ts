/**
 * Unit tests for authentication service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


/**
 * Mock JwtHelperService
 */
class MockJwtHelperService {
  /**
   * Controls if mock JSON web token is expired.
   */
  expired = false;

  /**
   * Mock function that checks if JSON web token is expired.
   *
   * @param token
   *   Mock JSON web token
   *
   * @returns
   *   If true, the mock JSON web token is expired.
   */
  isTokenExpired(token: string): boolean {
    return token.length > 0 && this.expired;
  }
}


describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: JwtHelperService, useClass: MockJwtHelperService},
        AuthService
      ]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('test successful login and logout of admin user', () => {
    authService.login('username', 'password')
        .subscribe((success: boolean) => {
          // test login
          expect(success).toBeTrue();
          expect(authService.isLoggedIn).toBeTrue();
          // test logout
          authService.logout();
          expect(authService.isLoggedIn).toBeFalse();
        }, fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/admins/login`);

    expect(testRequest.request.method).toMatch('POST');
    expect(testRequest.request.body.username).toMatch('username');
    expect(testRequest.request.body.password).toMatch('password');

    testRequest.flush({success: true, token: 'mockJWT'});
  });

  it('test unsuccessfl login of admin user', () => {
    authService.login('username', 'password')
        .subscribe((success: boolean) => {
          expect(success).toBeFalse();
          expect(authService.isLoggedIn).toBeFalse();
        }, fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/admins/login`);

    testRequest.flush({success: false});
  });

  afterEach(() => httpTestingController.verify());
});
