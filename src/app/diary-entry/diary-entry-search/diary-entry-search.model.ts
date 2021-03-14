/**
 * Diary entry search result model
 * @packageDocumentation
 */

import { DiaryEntry } from '../diary-entry.model';
import { DiaryEntrySearchNums } from './diary-entry-search-nums.model';


/**
 * Diary entry search result model
 *
 * This class represents the result of a search for diary entries on the
 * back-end server, given a list of search tags.
 */
export class DiaryEntrySearchResult {
  /**
   * List of search tags
   */
  #searchTags: string[];

  /**
   * List of found diary entries
   */
  readonly entries: DiaryEntry[];

  /**
   * Holds both the number of diary entries, which have all of the specified
   * search tags, already loaded from and available in total on the back-end
   * server, respectively.
   */
  readonly numEntries: DiaryEntrySearchNums;

  /**
   * Initialize a diary entry search model.
   *
   * @param searchTags
   *   List of search tags
   * @param entries
   *   List of found diary entries
   * @param numEntries
   *   Number of diary entries loaded from and available in total on the
   *   back-end server
   */
  constructor(searchTags: string[] = [], entries: DiaryEntry[] = [], numEntries = {loaded: 0, total: 0}) {
    this.#searchTags = searchTags;
    this.entries = entries;
    this.numEntries = numEntries;
  }

  /**
   * Specified diary entry search tags.
   */
  get searchTags(): string[] {
    return [...this.#searchTags];
  }

  /**
   * More diary entries are available on the back-end server
   *
   * This method checks if all of the diary entries available on the back-end
   * server in total, which have all of the specified search tags, are already
   * loaded from the back-end server or if more are available.
   *
   * @returns
   *   If `true`, more diary entries are available on the back-end server.
   */
  get hasMoreEntries(): boolean {
    return this.numEntries.loaded < this.numEntries.total;
  }
}
