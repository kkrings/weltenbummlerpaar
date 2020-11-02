/**
 * Utilities
 * @packageDocumentation
 */

import * as path from 'path';
import { browser, logging } from 'protractor';

import { AppPage } from './app.po';


export const DIARY_ENTRY: DiaryEntry = {
  title: 'some title',
  locationName: 'some location',
  body: 'some body',
  tags: 'some tag, some other tag'
};

export const IMAGES = [
  {
    filePath: getResource('lorem_picsum_1015.jpg'),
    description: 'some description'
  },
  {
    filePath: getResource('lorem_picsum_1016.jpg'),
    description: 'some other description'
  }
];

/**
 * Model for creating a diary entry
 */
export interface DiaryEntry {
  title: string;
  locationName: string;
  body: string;
  tags: string;
}

/**
 * Login as admin user.
 *
 * @param page
 *   Application's main page
 */
export function loginAdmin(page: AppPage): void {
  const authModal = page.openAuthModal();
  authModal.loginAdmin('admin', 'admin');
}

/**
 * Create a diary enttry.
 *
 * @param page
 *   Application's main page
 * @param diaryEntry
 *   The diary entry
 */
export function createDiaryEntry(page: AppPage, diaryEntry: DiaryEntry): void {
  const diaryEntryForm = page.openDiaryEntryForm();
  diaryEntryForm.createDiaryEntry(diaryEntry);
}

/**
 * Assert that there are no errors emitted from the browser.
 */
export async function checkBrowserLogsForErrors(): Promise<void> {
  const logs = await browser.manage().logs().get(logging.Type.BROWSER);

  expect(logs).not.toContain(jasmine.objectContaining(
    {level: logging.Level.SEVERE} as logging.Entry));
}


/**
 * Path to resource file
 *
 * @param filename
 *   Resource file's filename
 *
 * @returns
 *   Path to resource file
 */
function getResource(filename: string): string {
  return path.join(__dirname, 'resources', filename);
}
