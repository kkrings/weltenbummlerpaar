/**
 * Application's root page
 * @packageDocumentation
 */

import { browser, by, element } from 'protractor';

import { AuthModal } from './auth/auth-modal.po';
import { DiaryEntryCard } from './diary-entry/diary-entry-card.po';
import { DiaryEntryForm } from './diary-entry/diary-entry-form.po';


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
  openDiaryEntryFormButton = element(by.id('create-diary-entry-button'));

  /**
   * List of diary entry cards
   */
  diaryEntryCards = element.all(by.css('app-diary-entry-card'));

  /**
   * Navigate to the application's root page.
   */
  navigateToRoot(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  /**
   * Refresh the application's root page.
   */
  refresh(): void {
    browser.refresh();
  }

  /**
   * Open modal for logging in as the administrator.
   *
   * @returns
   *   Login modal
   */
  openAuthModal(): AuthModal {
    this.loginButton.click();
    return new AuthModal(element(by.css('app-auth-modal')));
  }

  /**
   * Logout the administrator.
   */
  logoutAdmin(): void {
    this.logoutButton.click();
  }

  /**
   * Open modal for creating a new diary entry.
   *
   * @returns
   *   Diary entry form modal
   */
  openDiaryEntryForm(): DiaryEntryForm {
    this.openDiaryEntryFormButton.click();
    return new DiaryEntryForm(element(by.css('app-diary-entry-form')));
  }

  /**
   * Get the number of diary entries.
   *
   * @returns
   *   Number of diary entries
   */
  getNumDiaryEntries(): Promise<number> {
    return this.diaryEntryCards.count() as Promise<number>;
  }

  /**
   * Get the first diary entry.
   *
   * @returns
   *   The first diary entry
   */
  getFirstDiaryEntry(): DiaryEntryCard {
    return new DiaryEntryCard(this.diaryEntryCards.first());
  }
}
