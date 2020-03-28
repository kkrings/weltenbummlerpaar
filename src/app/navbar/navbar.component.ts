/**
 * Navigation bar component
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../shared/auth.service';

import {
  NavbarLoginModalComponent
} from '../navbar-login-modal/navbar-login-modal.component';


/**
 * Navigation bar component
 *
 * This component represents the navigation bar at the top of the page, which
 * provides navigation links for logging in as an admin user, for logging out
 * again, and for creating new diary entries when logged in as an admin user,
 * respectively.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  /**
   * Construct the navigation bar component.
   *
   * @param authService
   *   Service that allows admin users to log out
   * @param modalService
   *   Service for showing the admin login form via Bootstrap's modal component
   */
  constructor(
      private authService: AuthService,
      private modalService: NgbModal) { }

  /**
   * Initialize the navigation bar component.
   */
  ngOnInit(): void { }

  /**
   * Open Bootstrap modal that shows the admin login form.
   */
  openLoginModal(): void {
    this.modalService.open(NavbarLoginModalComponent);
  }

  /**
   * Admin user logout
   *
   * Use the authentication service to log out the currently logged in admin
   * user.
   */
  logout(): void {
    this.authService.logout();
  }

  /**
   * Specifies if admin user is logged in or not.
   *
   * If no admin user is logged in, the login button is shown; otherwise, the
   * logout button is shown.
   */
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
