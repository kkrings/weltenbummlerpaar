/**
 * Diary entry model
 * @packageDocumentation
 */

import { Image } from '../image/image-model.po';

/**
 * Diary entry model
 */
export interface DiaryEntry {
  /**
   * Diary entry's title
   */
  title: string;
  /**
   * Diary entry's location
   */
  locationName: string;
  /**
   * Diary entry's body
   */
  body: string;
  /**
   * Diary entry's images
   */
  images: Image[];
  /**
   * Diary entry's tags
   */
  // tags: string;
}
