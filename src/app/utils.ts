import { DiaryEntry } from './diary-entry/diary-entry.model';

/**
 * Set the diary entry's preview image.
 *
 * Once a diary entry is returned from the back-end server, its preview image
 * and the corresponding image in its list of images are not referencing the
 * same object. This utility method fixes that.
 *
 * @param entry
 *   The diary entry (as returned from the back-end server)
 *
 * @returns
 *   The updated diary entry
 */
export const setPreviewImage = (entry: DiaryEntry): DiaryEntry => {
  entry.previewImage = entry.images.filter(
    (image) => image.id === entry.previewImage?.id
  )[0];

  return entry;
};
