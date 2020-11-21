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
 * Local image on disk
 */
export class LocalImage implements Image {
  /**
   * Create a new instance.
   *
   * @param description
   *   Image's description
   * @param file
   *   Optional: path to JPEG file on disk
   */
  constructor(
    public description: string,
    public file?: string) { }
}

/**
 * Remote image on back-end server
 */
export class RemoteImage implements Image {
  /**
   * Create a new instance.
   *
   * @param description
   *   Image's description
   * @param url
   *   Image's URL
   * @param width
   *   Image's width
   * @param height
   *   Image's height
   */
  constructor(
    public description: string,
    public url: string,
    public width: number,
    public height: number) {}
}
