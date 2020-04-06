/**
 * Image compression web worker
 * @packageDocumentation
 */

/// <reference lib="webworker" />

import * as Jimp from 'jimp';


/**
 * Image compression
 *
 * Resize the given image to a height of 2500 px and reduce its quality to 75%.
 *
 * @param url
 *   Path to image given as data URL
 *
 * @returns
 *   Processed image
 */
async function compressImage(url: string): Promise<Buffer> {
  const image = await Jimp.read(url);

  return image
      .resize(2500, Jimp.AUTO)
      .quality(75)
      .getBufferAsync(Jimp.MIME_JPEG);
}

/**
 * Compress the given image and send it back to the main thread.
 */
addEventListener('message', async ({data}) => {
  postMessage(await compressImage(data));
});
