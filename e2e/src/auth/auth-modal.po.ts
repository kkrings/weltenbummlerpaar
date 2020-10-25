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
  private usernameInput: ElementFinder;

  /**
   * Input field for entering the admin's password
   */
  private passwordInput: ElementFinder;

  /**
   * This button submits the entered username and password to the back-end
   * server.
   */
  private submitButton: ElementFinder;

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
