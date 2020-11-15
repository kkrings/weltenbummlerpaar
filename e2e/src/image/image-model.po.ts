/**
 * Image model
 * @packageDocumentation
 */

/**
 * Image model
 */
export interface Image {
  /**
   * Image's description
   */
  description: string;
}

/**
 * Remote image
 */
export interface RemoteImage {
  /**
   * Image's URL
   */
  url: string;
  /**
   * Image's width
   */
  width: number;
  /**
   * Image's height
   */
  height: number;
}
