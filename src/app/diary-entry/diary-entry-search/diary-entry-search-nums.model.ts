/**
 * Diary entry search numbers model
 * @packageDocumentation
 */


/**
 * Diary entry search numbers model
 *
 * When searching for diary entries on the back-end server, this interface
 * holds both the number of diary entries already loaded from and available in
 * total on the back-end server, respectively.
 */
export interface DiaryEntrySearchNums {
  /**
   * Number of diary entries already loaded from the back-end server
   */
  readonly loaded: number;

  /**
   * Number of diary entries available in total on the back-end server
   */
  readonly total: number;
}
