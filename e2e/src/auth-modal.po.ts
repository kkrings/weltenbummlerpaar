/**
 * Authentication modal
 * @packageDocumentation
 */

import { by, element } from 'protractor';

/**
 * Authentication modal
 *
 * This class represents the application's authentication modal for logging in
 * as the admin user.
 */
export class AuthModal {
  /**
   * Input field for entering the admin's username
   */
  usernameInput = element(by.id('username'));

  /**
   * Input field for entering the admin's password
   */
  passwordInput = element(by.id('password'));

  /**
   * This button submits the entered username and password to the back-end
   * server.
   */
  submitButton = element(by.css('button[type="submit"]'));

  /**
   * Login the admin user.
   *
   * @param username
   *   Admin's username
   * @param password
   *   Admin's password
   */
  loginAdmin(username: string = 'admin', password: string = 'admin'): void {
    this.usernameInput.sendKeys(username);
    this.passwordInput.sendKeys(password);
    this.submitButton.click();
  }
}
