/**
 * Navigation bar component
 * @packageDocumentation
 */

import { Component, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../auth/auth.service';
import { DiaryEntry } from '../diary-entry/diary-entry.model';

import {
  AuthModalComponent
} from '../auth/auth-modal/auth-modal.component';

import {
  DiaryEntryFormComponent
} from '../diary-entry/diary-entry-form/diary-entry-form.component';


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
export class NavbarComponent {
  /**
   * Send new diary entries back the parent component
   */
  @Output() newDiaryEntry = new EventEmitter<DiaryEntry>();

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
   * Admin login modal
   *
   * Open modal that shows the admin login form.
   */
  openLoginModal(): void {
    this.modalService.open(AuthModalComponent, {
      backdrop: 'static',
      keyboard: false
    });
  }

  /**
   * Diary entry modal
   *
   * Open modal that shows the form for creating/updating a diary entry. New
   * diary entries are send back to the parent component.
   */
  openDiaryEntryModal(): void {
    const modal = this.modalService.open(DiaryEntryFormComponent, {
      backdrop: 'static',
      keyboard: false
    });

    modal.result.then((diaryEntry?: DiaryEntry) => {
      if (diaryEntry) {
        this.newDiaryEntry.emit(diaryEntry);
      }
    });
  }

  /**
   * Admin logout
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
