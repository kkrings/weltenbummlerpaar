/**
 * Application's root page
 * @packageDocumentation
 */

import { browser, by, element } from 'protractor';

import { AuthModal } from './auth-modal.po';
import { DiaryEntryFormModal } from './diary-entry-form-modal.po';
import { DiaryEntryModal } from './diary-entry-modal.po';


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
   * List of diary entry cards
   */
  diaryEntryCards = element.all(by.tagName('app-diary-entry-card'));

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
   * Open modal for logging in as an administrator.
   *
   * @returns
   *   Login modal
   */
  openLoginModal(): AuthModal {
    this.loginButton.click();
    return new AuthModal();
  }

  /**
   * Open modal for creating a new diary entry.
   *
   * @returns
   *   Diary entry form modal
   */
  openModalForCreatingNewDiaryEntry(): DiaryEntryFormModal {
    this.createDiaryEntryButton.click();
    return new DiaryEntryFormModal();
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
   * Open the modal that shows the newest diary entry
   *
   * @returns
   *   The modal that shows the newest diary entry
   */
  openNewestDiaryEntry(): DiaryEntryModal {
    const diaryEntryCard = this.diaryEntryCards.first();

    const openModalButton = diaryEntryCard
      .element(by.className('card-body'))
      .element(by.tagName('button'));

    openModalButton.click();

    return new DiaryEntryModal(element(by.tagName('app-diary-entry-modal')));
  }

  /**
   * Delete the newest diary entry.
   */
  deleteNewestDiaryEntry(): void {
    const diaryEntryCard = this.diaryEntryCards.first();
    const deleteButton = diaryEntryCard.element(by.className('btn-danger'));
    deleteButton.click();
  }
}
