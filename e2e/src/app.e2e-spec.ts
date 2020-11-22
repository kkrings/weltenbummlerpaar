/**
 * End-to-end testing
 * @packageDocumentation
 */

import * as utils from './app-utils.po';
import { AppPage } from './app.po';

import {
  WriteDiaryEntry, ReadDiaryEntry
} from './diary-entry/diary-entry-model.po';

import { DiaryEntryCard } from './diary-entry/diary-entry-card.po';


describe('weltenbummlerpaar', () => {
  const testDiaryEntry: WriteDiaryEntry = {
    title: 'title before update',
    location: 'location before update',
    body: 'body before update',
    images: [
      {
        description: 'image: moved down',
        file: utils.getResource('lorem_picsum_1015.jpg')
      },
      {
        description: 'image: moved up, updated (before update)',
        file: utils.getResource('lorem_picsum_1016.jpg')
      },
      {
        description: 'image: deleted',
        file: utils.getResource('lorem_picsum_1018.jpg')
      }
    ],
    // tags: 'some tag, some other tag'
  };

  let imagesExist = testDiaryEntry.images.map(_ => false);

  const testDiaryEntryAfterUpdate: WriteDiaryEntry = {
    title: 'title after update',
    location: 'location after update',
    body: 'body after update',
    images: [
      {
        description: 'image: moved up, updated (after update)',
        file: utils.getResource('lorem_picsum_1019.jpg')
      },
      { description: 'image: moved down' }
    ]
    // tags: 'some tag, some other tag'
  };

  let imagesExistAfterUpdate = testDiaryEntry.images.map(_ => false);

  let page: AppPage;
  let diaryEntryCard: DiaryEntryCard;
  let diaryEntry: ReadDiaryEntry;
  let diaryEntryAfterUpdate: ReadDiaryEntry;

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
    imagesExist = await Promise.all(diaryEntry.images.map(
      async image => await utils.remoteImageExistsAsync(image.url)));
  });

  beforeAll(async () => {
    const update = testDiaryEntryAfterUpdate.images[0];
    const modal = await diaryEntryCard.openImageModalAsync();
    await modal.getImageUpload(1).uploadOrUpdateImageAsync(update);
    await modal.getImageUpload(2).deleteImageAsync();
    await modal.closeModalAsync();
  });

  beforeAll(async () => {
    await page.refreshAsync();
  });

  beforeAll(async () => {
    const form = await diaryEntryCard.openUpdateEntryModalAsync();
    await form.fillFormAsync(testDiaryEntryAfterUpdate);
    await form.moveImageDownAsync(0);
    await form.submitFormAsync();
  });

  beforeAll(async () => {
    await page.refreshAsync();
  });

  beforeAll(async () => {
    const modal = await diaryEntryCard.openEntryModalAsync();
    diaryEntryAfterUpdate = await modal.getEntryAsync();
    await modal.closeModalAsync();
  });

  beforeAll(async () => {
    imagesExistAfterUpdate = await Promise.all(diaryEntryAfterUpdate.images.map(
      async image => await utils.remoteImageExistsAsync(image.url)));

    imagesExistAfterUpdate.push(
      await utils.remoteImageExistsAsync(diaryEntry.images[2].url));
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
    const expected = utils.asDiaryEntry(testDiaryEntry);
    expect(entry).toEqual(expected);
  });

  it('check if the diary entry\'s images existence', () => {
    const expected = testDiaryEntry.images.map(_ => true);
    expect(imagesExist).toEqual(expected);
  });

  it('check the width of the created diary entry\'s images', () => {
    const widths = diaryEntry.images.map(image => image.width);
    const expected = testDiaryEntry.images.map(_ => 2500);
    expect(widths).toEqual(expected);
  });

  it('check the created diary entry after its update', () => {
    const entry = utils.asDiaryEntry(diaryEntryAfterUpdate);
    const expected = utils.asDiaryEntry(testDiaryEntryAfterUpdate);
    expect(entry).toEqual(expected);
  });

  it('check if the diary entry\'s images existence after its update', () => {
    const expected = testDiaryEntryAfterUpdate.images.map(_ => true);
    expected.push(false);
    expect(imagesExistAfterUpdate).toEqual(expected);
  });

  it('check the width of the created diary entry\'s images', () => {
    const widths = diaryEntryAfterUpdate.images.map(image => image.width);
    const expected = testDiaryEntryAfterUpdate.images.map(_ => 2500);
    expect(widths).toEqual(expected);
  });

  it('check if created diary entry is deleted', async () => {
    expect(await page.getNumDiaryEntryCardsAsync()).toEqual(0);
  });

  it('check if the diary entry\'s images are deleted', async () => {
    const status = await Promise.all(diaryEntryAfterUpdate.images.map(
      async image => await utils.remoteImageExistsAsync(image.url)));

    const expected = diaryEntryAfterUpdate.images.map(_ => false);

    expect(status).toEqual(expected);
  });

  afterAll(utils.checkBrowserLogsForErrors);
});
