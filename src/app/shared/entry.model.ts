import { Image } from './image.model';

/**
 * Diary entry model
 */
export interface DiaryEntry {
  _id: string;
  title: string;
  body: string;
  country: string;
  images: Image[];
  createdAt: string;
}
