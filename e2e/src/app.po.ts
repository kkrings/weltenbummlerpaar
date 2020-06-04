/**
 * Application's root page
 * @packageDocumentation
 */

import { browser, by, element } from 'protractor';

/**
 * Application's root page
 *
 * This class represents the application's root page.
 */
export class AppPage {
  /**
   * This button in the navigation bar opens the admin login modal.
   */
  loginButton = element(by.id('login-button'));

  /**
   * This button in the navigation bar triggers the admin user's logout.
   */
  logoutButton = element(by.id('logout-button'));

  /**
   * This button in the navigation bar opens the modal that allows the admin
   * user to create a new diary entry.
   */
  createDiaryEntryButton = element(by.id('create-diary-entry-button'));

  /**
   * Navigate to the application's root page.
   */
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }
}
