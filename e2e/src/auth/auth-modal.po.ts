/**
 * Authentication modal
 * @packageDocumentation
 */

import { by, ElementFinder } from 'protractor';


/**
 * Authentication modal
 *
 * This class represents a modal for user authentication.
 */
export class AuthModal {
  /**
   * Input field for entering the admin's username
   */
  usernameInput: ElementFinder;

  /**
   * Input field for entering the admin's password
   */
  passwordInput: ElementFinder;

  /**
   * This button submits the entered username and password to the back-end
   * server.
   */
  submitButton: ElementFinder;

  /**
   * Create a new instance.
   *
   * @param modal
   *   The modal for user authentication
   */
  constructor(modal: ElementFinder) {
    this.usernameInput = modal.element(by.id('username'));
    this.passwordInput = modal.element(by.id('password'));
    this.submitButton = modal.element(by.css('button[type="submit"]'));
  }

  /**
   * Login as admin.
   *
   * @param username
   *   Admin's username
   * @param password
   *   Admin's password
   */
  async loginAdminAsync(username: string, password: string): Promise<void> {
    await this.usernameInput.sendKeys(username);
    await this.passwordInput.sendKeys(password);
    await this.submitButton.click();
  }
}
