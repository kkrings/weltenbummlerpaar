/**
 * Diary entry search result model
 * @packageDocumentation
 */

import { DiaryEntry } from '../diary-entry.model';

/**
 * Diary entry search result model
 *
 * This interface represents the result of a search for diary entries on the
 * back-end server, given a list of search tags.
 */
export interface DiaryEntrySearchResult {
  /**
   * List of search tags
   */
  searchTags: string[];

  /**
   * List of found diary entries
   */
  entries: DiaryEntry[];

  /**
   * Number of available diary entries
   */
  numEntries: number;
}
