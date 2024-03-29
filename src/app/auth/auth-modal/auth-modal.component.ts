/**
 * Authentication modal component
 * @packageDocumentation
 */

import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

import { Alert, AlertType } from '../../http-alert/alert.model';
import { AuthService } from '../auth.service';

/**
 * Authentication modal component
 *
 * This component represents a login form for admin users. The login form is
 * presented to the user via Bootstrap's modal component.
 */
@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent {
  /**
   * Reactive form for admin login
   */
  adminLoginForm: UntypedFormGroup;

  /**
   * Show spinner instead of login button while login request is processed.
   */
  showSpinner = false;

  /**
   * Alert type hat corresponds to the alert message that is shown if login
   * request has failed due to HTTP errors
   */
  httpAlert = new Alert();

  /**
   * An alert message is shown if login request has failed due to wrong login
   * credentials
   */
  loginFailed = false;

  /**
   * Specifies if the password should be shown in clear text or not.
   */
  showPassword = false;

  /**
   * Icon that indicates that the password is not shown in clear text.
   */
  passwordNotShownIcon = faLock;

  /**
   * Icon that indicates that the password is shown in clear text.
   */
  passwordShownIcon = faLockOpen;

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
    formBuilder: UntypedFormBuilder,
    private modal: NgbActiveModal,
    private authService: AuthService
  ) {
    // build the admin login form
    this.adminLoginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Username form control
   */
  get username(): UntypedFormControl {
    return this.adminLoginForm.get('username') as UntypedFormControl;
  }

  /**
   * Password form control
   */
  get password(): UntypedFormControl {
    return this.adminLoginForm.get('password') as UntypedFormControl;
  }

  /**
   * Toggle between password shown and not shown.
   */
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
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
      formControl !== null &&
      formControl.invalid &&
      (formControl.dirty || formControl.touched) &&
      formControl.errors !== null &&
      formControl.errors['required']
    );
  }

  /**
   * Close the admin login modal.
   */
  close(): void {
    this.modal.close();
  }

  /**
   * Submit login request to back-end server.
   *
   * If the login request is successful, the modal is closed, otherwise an
   * error message is presented to the user.
   */
  onSubmit(): void {
    const { username, password } = this.adminLoginForm.value;

    // reset failed login message
    this.loginFailed = false;

    // reset HTTP alert message
    this.httpAlert.alertType = AlertType.none;

    // activate spinner; gets deactivated again when back-end server has
    // responded
    this.showSpinner = true;

    this.authService.login(username, password).subscribe(
      (success: boolean) => {
        this.showSpinner = false;

        if (success) {
          this.modal.close();
        } else {
          this.loginFailed = true;
        }
      },
      (alertType: AlertType) => {
        this.showSpinner = false;
        this.httpAlert.alertType = alertType;
      }
    );
  }
}
