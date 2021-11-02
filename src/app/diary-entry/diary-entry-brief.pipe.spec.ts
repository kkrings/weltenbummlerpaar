/**
 * Unit tests for diary entry brief pipe
 * @packageDocumentation
 */

import { DiaryEntryBriefPipe } from './diary-entry-brief.pipe';
import { DiaryEntry } from './diary-entry.model';

describe('DiaryEntryBriefPipe', () => {
  const diaryEntry: DiaryEntry = {
    _id: '0',
    title: 'some title',
    locationName: 'some location',
    body: 'some body',
    images: [],
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('#transform should not transform short bodies', () => {
    diaryEntry.body = 'A short body.';
    const pipe = new DiaryEntryBriefPipe();
    const briefLength = diaryEntry.body.length + 1;
    const briefBody = pipe.transform(diaryEntry, briefLength);
    expect(briefBody).toMatch(diaryEntry.body);
    expect(briefBody.length).toBeLessThanOrEqual(briefLength);
  });

  it('#transform should not transform short first paragraphs', () => {
    diaryEntry.body = 'A short first paragraph.\n...';
    const pipe = new DiaryEntryBriefPipe();
    const briefLength = diaryEntry.body.length + 1;
    const briefBody = pipe.transform(diaryEntry, briefLength);
    const firstParagraph = diaryEntry.body.split('\n')[0];
    expect(briefBody).toMatch(firstParagraph);
    expect(briefBody.length).toBeLessThanOrEqual(briefLength);
  });

  it('#transform should transform long bodies', () => {
    diaryEntry.body = 'This is a long boooody.';
    const pipe = new DiaryEntryBriefPipe();
    const briefLength = diaryEntry.body.length - 1;
    const briefBody = pipe.transform(diaryEntry, briefLength);
    expect(briefBody).toMatch('This is a long ...');
    expect(briefBody.length).toBeLessThanOrEqual(briefLength);
  });
});
