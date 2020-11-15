/**
 * Application's root page
 * @packageDocumentation
 */

import { browser, by, element } from 'protractor';

import { AuthModal } from './auth/auth-modal.po';
import { DiaryEntryCard } from './diary-entry/diary-entry-card.po';
import { DiaryEntryForm } from './diary-entry/diary-entry-form.po';
import { DiaryEntry } from './diary-entry/diary-entry-model.po';


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
  async navigateToRootAsync(): Promise<void> {
    await browser.get(browser.baseUrl);
  }

  /**
   * Refresh the application's root page.
   */
  async refreshAsync(): Promise<void> {
    await browser.refresh();
  }

  /**
   * Open modal for logging in as admin.
   *
   * @returns
   *   Login modal
   */
  async openAuthModalAsync(): Promise<AuthModal> {
    await this.loginButton.click();
    return new AuthModal(element(by.css('app-auth-modal')));
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
    const modal = await this.openAuthModalAsync();
    await modal.loginAdminAsync(username, password);
  }

  /**
   * Logout as admin.
   */
  async logoutAdminAsync(): Promise<void> {
    await this.logoutButton.click();
  }

  /**
   * Open modal for creating a new diary entry.
   *
   * @returns
   *   Diary entry form modal
   */
  async openDiaryEntryFormAsync(): Promise<DiaryEntryForm> {
    await this.openDiaryEntryFormButton.click();
    return new DiaryEntryForm(element(by.css('app-diary-entry-form')));
  }

  /**
   * Create a new diary entry.
   *
   * @param entry
   *   Diary entry
   */
  async createDiaryEntryAsync(entry: DiaryEntry): Promise<void> {
    const form = await this.openDiaryEntryFormAsync();
    await form.createDiaryEntryAsync(entry);
  }

  /**
   * Get the number of diary entries.
   *
   * @returns
   *   Number of diary entries
   */
  async getNumDiaryEntryCardsAsync(): Promise<number> {
    return await this.diaryEntryCards.count();
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
