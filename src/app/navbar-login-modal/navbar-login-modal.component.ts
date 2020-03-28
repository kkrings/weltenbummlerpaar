/**
 * Admin login modal component
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../shared/auth.service';


/**
 * Admin login modal component
 *
 * This component represents a login form for admin users. The login form is
 * presented to the user via Bootstrap's modal component.
 */
@Component({
  selector: 'app-navbar-login-modal',
  templateUrl: './navbar-login-modal.component.html',
  styleUrls: ['./navbar-login-modal.component.scss']
})
export class NavbarLoginModalComponent implements OnInit {
  /**
   * Reactive form for admin login
   */
  adminLoginForm: FormGroup;

  /**
   * Show spinner instead of login button while login request is processed.
   */
  showSpinner = false;

  /**
   * Alert message that is shown if login request has failed due to HTTP errors
   * or wrong login credentials
   */
  loginFailedMessage = '';

  /**
   * Construct the admin login modal component.
   *
   * @param formBuilder
   *   Builds the reactive form for the admin login.
   * @param modal
   *   Holds a reference to the modal.
   * @param authService
   *   Service for sending the login request to the back-end server
   */
  constructor(
      private formBuilder: FormBuilder,
      private modal: NgbActiveModal,
      private authService: AuthService) { }

  /**
   * Initialize the admin login modal component.
   */
  ngOnInit(): void {
    // build the admin login form
    this.adminLoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Show validation errors for the given form control.
   *
   * @param formControlName
   *   Name of form control
   *
   * @returns
   *   If true, a validation error is shown to the user.
   */
  showValidationError(formControlName: string): boolean {
    const formControl = this.adminLoginForm.get(formControlName);

    return (
        (formControl !== null) &&
        (formControl.invalid) &&
        (formControl.dirty || formControl.touched) &&
        (formControl.errors !== null) &&
        (formControl.errors.required)
    );
  }

  /**
   * Dismiss the admin login modal.
   */
  dismiss(): void {
    this.modal.dismiss();
  }

  /**
   * Submit login request to back-end server.
   *
   * If the login request is successful, the modal is closed, otherwise an
   * error message is presented to the user.
   */
  onSubmit(): void {
    const {username, password} = this.adminLoginForm.value;

    // reset failed login message
    this.loginFailedMessage = '';

    // activate spinner; gets deactivated again when back-end server has
    // responded
    this.showSpinner = true;

    this.authService.login(username, password).subscribe(
      (success: boolean) => {
        if (success) {
          this.showSpinner = false;
          this.modal.close();
        } else {
          this.showSpinner = false;

          this.loginFailedMessage =
              'Der Admin-Login ist fehl geschlagen, ' +
              'da Username und/oder Passwort falsch sind.';
        }
      },
      (error: string) => this.loginFailedMessage = error);
  }
}
