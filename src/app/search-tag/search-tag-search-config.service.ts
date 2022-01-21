/**
 * Search tag search config
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';

/**
 * Config for search tag search component
 */
@Injectable({
  providedIn: 'root',
})
export class SearchTagSearchConfig {
  /**
   * Wait the given number of milliseconds before sending the search request to
   * the back-end server.
   */
  readonly waitForNumMs: number = 300;
}
