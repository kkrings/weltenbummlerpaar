/**
 * End-to-end testing
 * @packageDocumentation
 */

import * as utils from './app-utils.po';
import { AppPage } from './app.po';
import { DiaryEntry } from './diary-entry/diary-entry-model.po';
import { DiaryEntryCard } from './diary-entry/diary-entry-card.po';
import { RemoteImage } from './image/image-model.po';


describe('weltenbummlerpaar', () => {
  const testDiaryEntry: DiaryEntry = {
    title: 'some title',
    locationName: 'some location',
    body: 'some body',
    images: [
      { description: 'some description' },
      { description: 'some other description' }
    ],
    // tags: 'some tag, some other tag'
  };

  const testLocalImages = [
    utils.getResource('lorem_picsum_1015.jpg'),
    utils.getResource('lorem_picsum_1016.jpg')
  ];

  const testDiaryEntryAfterUpdate: DiaryEntry = {
    title: 'some title',
    locationName: 'some location',
    body: 'some body',
    images: [
      { description: 'some other description' }
    ]
    // tags: 'some tag, some other tag'
  };

  let page: AppPage;
  let diaryEntryCard: DiaryEntryCard;
  let diaryEntry: DiaryEntry;
  let diaryEntryImages: RemoteImage[];
  let diaryEntryAfterUpdate: DiaryEntry;

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
    await diaryEntryCard.uploadImagesAsync(
      testDiaryEntry.images,
      testLocalImages);
  });

  beforeAll(async () => {
    await page.refreshAsync();
  });

  beforeAll(async () => {
    const modal = await diaryEntryCard.openEntryModalAsync();
    diaryEntry = await modal.getEntryAsync();
    diaryEntryImages = await modal.imageCarousel.getRemoteImagesAsync();
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
    firstImageIsDeleted = !(await utils.remoteImageExistsAsync(
      diaryEntryImages[0].url));
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
    expect(diaryEntry).toEqual(testDiaryEntry);
  });

  it('check the width of the created diary entry\'s first image', () => {
    expect(diaryEntryImages[0].width).toEqual(2500);
  });

  it('check if the diary entry\'s first image is deleted', () => {
    expect(firstImageIsDeleted).toEqual(true);
  });

  it('check the created diary entry after its update', () => {
    expect(diaryEntryAfterUpdate).toEqual(testDiaryEntryAfterUpdate);
  });

  it('page does not contain the created diary entry after its deletion', async () => {
    expect(await page.getNumDiaryEntryCardsAsync()).toEqual(0);
  });

  afterAll(utils.checkBrowserLogsForErrors);
});
