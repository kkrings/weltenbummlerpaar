/**
 * Unit tests for authentication service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthService
      ]
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('test successful login and logout of admin user', () => {
    service.login('username', 'password').subscribe((success: boolean) => {
      // test login
      expect(success).toBeTrue();
      expect(service.isLoggedIn).toBeTrue();
      // test logout
      service.logout();
      expect(service.isLoggedIn).toBeFalse();
    }, fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/admins/login`);

    expect(testRequest.request.method).toMatch('POST');
    expect(testRequest.request.body.username).toMatch('username');
    expect(testRequest.request.body.password).toMatch('password');

    testRequest.flush({success: true, token: 'testJWT'});
  });

  afterEach(() => httpTestingController.verify());
});
