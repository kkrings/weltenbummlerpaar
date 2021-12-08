/**
 * Authentication service
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { HttpAlertService } from '../http-alert/http-alert.service';
import { environment } from '../../environments/environment';

/**
 * Interface for token response from back-end server
 */
interface Token {
  /**
   * Actual JSON web token
   */
  readonly accessToken: string;
}

/**
 * Authentication service
 *
 * This service allows an admin user to authenticate against the back-end
 * server by providing a username and a password.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Construct the authentication service.
   *
   * @param http
   *   Enables the communication with the back-end server.
   * @param httpAlertService
   *   Handles failed HTTP requests.
   * @param jwtHelperService
   *   Checks if the JSON web token is expired.
   */
  constructor(
    private http: HttpClient,
    private httpAlertService: HttpAlertService,
    private jwtHelperService: JwtHelperService
  ) {}

  /**
   * Admin login
   *
   * Authenticate an admin user via username and password. Save the JSON web
   * token returned by the back-end server in the local storage.
   *
   * @param username
   *   Admin user's username
   * @param password
   *   Admin user's password
   *
   * @returns
   *   True if authentication was successful.
   */
  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<Token>(`${environment.baseurl}/rest/auth/login`, {
        username,
        password,
      })
      .pipe(
        map((response: Token) => this.toSuccess(response)),
        catchError(this.httpAlertService.handleError)
      );
  }

  /**
   * Admin logout
   *
   * Logout admin user by removing the admin user's JSON web token from the
   * local storage.
   */
  logout(): void {
    localStorage.removeItem('JWT');
  }

  /**
   * Specifies if admin user is logged in or not.
   */
  get isLoggedIn(): boolean {
    const token = localStorage.getItem('JWT');

    if (token) {
      return !this.jwtHelperService.isTokenExpired(token);
    }

    return false;
  }

  /**
   * Map authentication response to success.
   *
   * @param response
   *   Authentication response
   *
   * @returns
   *   If `true`, the admin login was successful.
   */
  private toSuccess(response: Token): boolean {
    localStorage.setItem('JWT', response.accessToken);
    return true;
  }
}
