/**
 * Utilities
 * @packageDocumentation
 */

import * as path from 'path';
import { browser, logging } from 'protractor';


/**
 * Path to resource file
 *
 * @param filename
 *   Resource file's filename
 *
 * @returns
 *   Path to resource file
 */
export function getResource(filename: string): string {
  return path.join(__dirname, 'resources', filename);
}

/**
 * Assert that there are no errors emitted from the browser.
 */
export async function checkBrowserLogsForErrors(): Promise<void> {
  const logs = await browser.manage().logs().get(logging.Type.BROWSER);

  expect(logs).not.toContain(jasmine.objectContaining(
    {level: logging.Level.SEVERE} as logging.Entry));
}
