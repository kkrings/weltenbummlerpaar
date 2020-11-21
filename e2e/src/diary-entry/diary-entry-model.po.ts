/**
 * Diary entry model
 * @packageDocumentation
 */

import { Image, LocalImage, RemoteImage } from '../image/image-model.po';

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
  location: string;
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

/**
 * Helper class for creating a diary entry
 */
export class WriteDiaryEntry implements DiaryEntry {
  /**
   * Create a new diary entry.
   *
   * @param title
   *   Diary entry's title
   * @param location
   *   Diary entry's location
   * @param body
   *   Diary entry's body
   * @param images
   *   Diary entry's images
   */
  constructor(
    public title: string,
    public location: string,
    public body: string,
    public images: LocalImage[]) { }
}

/**
 * Helper class for reading a diary entry
 */
export class ReadDiaryEntry implements DiaryEntry {
  /**
   * Read diary entry.
   *
   * @param title
   *   Diary entry's title
   * @param location
   *   Diary entry's location
   * @param body
   *   Diary entry's body
   * @param images
   *   Diary entry's images
   */
  constructor(
    public title: string,
    public location: string,
    public body: string,
    public images: RemoteImage[]) { }
}
