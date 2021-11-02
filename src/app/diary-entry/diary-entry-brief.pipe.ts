/**
 * Diary entry brief pipe
 * @packageDocumentation
 */

import { Pipe, PipeTransform } from '@angular/core';

import { DiaryEntry } from './diary-entry.model';

/**
 * Diary entry brief pipe
 *
 * This pipe can be used to show a brief version of a diary entry's body.
 */
@Pipe({
  name: 'diaryEntryBrief',
})
export class DiaryEntryBriefPipe implements PipeTransform {
  /**
   * Brief version of diary entry's body
   *
   * @param diaryEntry
   *   Diary entry
   * @param length
   *   Maximum number of characters
   *
   * @returns
   *   Brief version of diary entry's body
   */
  transform(diaryEntry: DiaryEntry, length: number): string {
    // get first paragraph
    let body = diaryEntry.body.split('\n')[0];

    if (body.length > length) {
      // truncate body after last word and append '...' such that brief body
      // has less than briefLength characters
      const dots = ' ...';
      body = body.substring(0, length - dots.length + 1);
      const end = body.lastIndexOf(' ');
      body = body.substring(0, end) + dots;
    }

    return body;
  }
}
