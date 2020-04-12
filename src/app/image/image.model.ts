/**
 * Image model
 * @packageDocumentation
 */

/**
 * Image model
 */
export interface Image {
  /**
   * Image file that should be uploaded to the back-end server
   */
  file?: File;

  /**
   * Image's ID
   */
  _id: string;

  /**
   * Image's description
   */
  description: string;

  /**
   * Image's creation date and time
   */
  createdAt: string;

  /**
   * Date and time when image was last updated.
   */
  updatedAt: string;
}
