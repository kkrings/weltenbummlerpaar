/**
 * Utilities
 * @packageDocumentation
 */

import * as http from 'http';
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
 * Check if image exists on back-end server
 *
 * @param url
 *   Image URL
 *
 * @returns
 *   If true, the image exists.
 */
export function remoteImageExistsAsync(url: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const req = http.get(url, res => resolve(res.statusCode === 200));
    req.on('error', reject);
  });
}

/**
 * Assert that there are no errors emitted from the browser.
 */
export async function checkBrowserLogsForErrors(): Promise<void> {
  const logs = await browser.manage().logs().get(logging.Type.BROWSER);

  expect(logs).not.toContain(jasmine.objectContaining(
    {level: logging.Level.SEVERE} as logging.Entry));
}
