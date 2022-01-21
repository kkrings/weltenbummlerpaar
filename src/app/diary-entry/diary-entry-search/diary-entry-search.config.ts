/**
 * Diary entry search config
 * @packageDocumentation
 */

import { Injectable } from '@angular/core';

/**
 * Config for diary entry search service
 */
@Injectable({
  providedIn: 'root',
})
export class DiaryEntrySearchConfig {
  /**
   * Instead of requesting all available diary entries at once when searching
   * for diary entries, limit this number.
   */
  readonly limitNumEntries: number = 10;
}
