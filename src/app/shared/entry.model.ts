import { Image } from './image.model';

/**
 * Diary entry model
 */
export interface DiaryEntry {
  /**
   * Diary entry's ID
   */
  _id: string;

  /**
   * Diary entry's title
   */
  title: string;

  /**
   * Diary entry's body
   */
  body: string;

  /**
   * Country name the diary entry refers to
   */
  country: string;

  /**
   * List of image objects
   */
  images: Image[];

  /**
   * Diary entry's creation date and time
   */
  createdAt: string;

  /**
   * Date and time when the diary entry was last updated.
   */
  updatedAt: string;
}
