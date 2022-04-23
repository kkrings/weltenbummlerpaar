/**
 * Diary entry model
 * @packageDocumentation
 */

import { DateRange } from '../date-range/date-range.model';
import { Image } from '../image/image.model';

/**
 * Diary entry model
 */
export interface DiaryEntry {
  /**
   * Diary entry's ID
   */
  id: string;

  /**
   * Diary entry's title
   */
  title: string;

  /**
   * Diary entry's body
   */
  body: string;

  /**
   * Location the diary entry refers to, e.g.:
   * city, state, country
   */
  location: string;

  /**
   * Time period the diary diary entry covers
   */
  dateRange?: DateRange;

  /**
   * Diary entry's preview image
   */
  previewImage?: Image;

  /**
   * List of image objects
   */
  images: Image[];

  /**
   * List of search tags
   */
  searchTags: string[];

  /**
   * Diary entry's creation date and time
   */
  createdAt: string;

  /**
   * Date and time when the diary entry was last updated.
   */
  updatedAt: string;
}
