/**
 * End-to-end testing
 * @packageDocumentation
 */

import * as utils from './app-utils.po';
import { AppPage } from './app.po';

import {
  DiaryEntry, WriteDiaryEntry, ReadDiaryEntry
} from './diary-entry/diary-entry-model.po';

import { DiaryEntryCard } from './diary-entry/diary-entry-card.po';


describe('weltenbummlerpaar', () => {
  const testDiaryEntry: WriteDiaryEntry = {
    title: 'some title',
    location: 'some location',
    body: 'some body',
    images: [
      {
        description: 'some description',
        file: utils.getResource('lorem_picsum_1015.jpg')
      },
      {
        description: 'some other description',
        file: utils.getResource('lorem_picsum_1016.jpg')
      }
    ],
    // tags: 'some tag, some other tag'
  };

  const testDiaryEntryAfterUpdate: DiaryEntry = {
    title: 'some title',
    location: 'some location',
    body: 'some body',
    images: [
      { description: 'some other description' }
    ]
    // tags: 'some tag, some other tag'
  };

  let page: AppPage;
  let diaryEntryCard: DiaryEntryCard;
  let diaryEntry: ReadDiaryEntry;
  let diaryEntryAfterUpdate: ReadDiaryEntry;

  let firstImageIsDeleted = false;

  beforeAll(() => {
    page = new AppPage();
  });

  beforeAll(async () => {
    await page.navigateToRootAsync();
  });

  beforeAll(async () => {
    await page.loginAdminAsync('admin', 'admin');
    expect(await page.openDiaryEntryFormButton.isPresent()).toEqual(true);
  });

  beforeAll(async () => {
    await page.createDiaryEntryAsync(testDiaryEntry);
    expect(await page.getNumDiaryEntryCardsAsync()).toEqual(1);
  });

  beforeAll(() => {
    diaryEntryCard = page.getFirstDiaryEntry();
  });

  beforeAll(async () => {
    await diaryEntryCard.uploadImagesAsync(testDiaryEntry.images);
  });

  beforeAll(async () => {
    await page.refreshAsync();
  });

  beforeAll(async () => {
    const modal = await diaryEntryCard.openEntryModalAsync();
    diaryEntry = await modal.getEntryAsync();
    await modal.closeModalAsync();
  });

  beforeAll(async () => {
    const modal = await diaryEntryCard.openImageModalAsync();
    await modal.getImageUpload(0).deleteImageAsync();
    await modal.closeModalAsync();
  });

  beforeAll(async () => {
    await page.refreshAsync();
  });

  beforeAll(async () => {
    const image = diaryEntry.images[0].url;
    firstImageIsDeleted = !(await utils.remoteImageExistsAsync(image));
  });

  beforeAll(async () => {
    const modal = await diaryEntryCard.openEntryModalAsync();
    diaryEntryAfterUpdate = await modal.getEntryAsync();
    await modal.closeModalAsync();
  });

  beforeAll(async () => {
    await diaryEntryCard.deleteDiaryEntryAsync();
  });

  beforeAll(async () => {
    await page.logoutAdminAsync();
  });

  beforeAll(async () => {
    await page.refreshAsync();
  });

  it('check the created diary entry before its update', () => {
    const entry = utils.asDiaryEntry(diaryEntry);
    const reference = utils.asDiaryEntry(testDiaryEntry);
    expect(entry).toEqual(reference);
  });

  it('check the width of the created diary entry\'s first image', () => {
    expect(diaryEntry.images[0].width).toEqual(2500);
  });

  it('check if the diary entry\'s first image is deleted', () => {
    expect(firstImageIsDeleted).toEqual(true);
  });

  it('check the created diary entry after its update', () => {
    const entry = utils.asDiaryEntry(diaryEntryAfterUpdate);
    const reference = utils.asDiaryEntry(testDiaryEntryAfterUpdate);
    expect(entry).toEqual(reference);
  });

  it('check if created diary entry is deleted', async () => {
    expect(await page.getNumDiaryEntryCardsAsync()).toEqual(0);
  });

  afterAll(utils.checkBrowserLogsForErrors);
});
