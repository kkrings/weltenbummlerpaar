/**
 * Unit tests for diary entry service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { AlertType } from '../http-alert/alert.model';
import { HttpAlertService } from '../http-alert/http-alert.service';
import { Image } from '../image/image.model';
import { DiaryEntry } from './diary-entry.model';
import { DiaryEntryService } from './diary-entry.service';

describe('DiaryEntryService', () => {
  let service: DiaryEntryService;
  let httpTestingController: HttpTestingController;

  const testDiaryEntries: DiaryEntry[] = [
    {
      id: '0',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      images: [],
      searchTags: ['some tag'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '1',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      images: [],
      searchTags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DiaryEntryService, HttpAlertService],
    });

    service = TestBed.inject(DiaryEntryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('#getEntries should find diary entries', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service
      .getEntries(testDiaryEntry.searchTags)
      .subscribe((diaryEntries: DiaryEntry[]) => {
        expect(diaryEntries.length).toEqual(1);
        expect(diaryEntries[0]).toEqual(testDiaryEntry);
      }, fail);

    const query = testDiaryEntry.searchTags
      .map((tag) => `searchTags=${tag}`)
      .join('&');

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries?${query}`
    );

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush([testDiaryEntry]);
  });

  it('#getEntries should return all diary entries', () => {
    service.getEntries().subscribe((diaryEntries: DiaryEntry[]) => {
      expect(diaryEntries).toEqual(testDiaryEntries);
    }, fail);

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries`
    );

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush(testDiaryEntries);
  });

  it('#getEntries should skip diary entries', () => {
    const testSkip = 10;

    service.getEntries([], testSkip).subscribe((diaryEntries: DiaryEntry[]) => {
      expect(diaryEntries).toEqual(testDiaryEntries);
    }, fail);

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries?skipDiaryEntries=${testSkip}`
    );

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush(testDiaryEntries);
  });

  it('#getEntries should limit diary entries', () => {
    const testLimit = 10;

    service
      .getEntries([], 0, testLimit)
      .subscribe((diaryEntries: DiaryEntry[]) => {
        expect(diaryEntries).toEqual(testDiaryEntries);
      }, fail);

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries?numDiaryEntries=${testLimit}`
    );

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush(testDiaryEntries);
  });

  it('#getEntries should return alert message', () => {
    service
      .getEntries()
      .subscribe(fail, (alertType: AlertType) =>
        expect(alertType).toEqual(AlertType.server)
      );

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries`
    );

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server',
    });
  });

  it('#countEntries should return total number of all diary entries', () => {
    const testNumEntries = 10;

    service.countEntries().subscribe((numEntries) => {
      expect(numEntries).toEqual(testNumEntries);
    }, fail);

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries/count`
    );

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush(testNumEntries);
  });

  it('#countEntries should return total number of found diary entries', () => {
    const testSearchTags = ['some search tag', 'some other search tag'];
    const testNumEntries = 10;

    service.countEntries(testSearchTags).subscribe((numEntries) => {
      expect(numEntries).toEqual(testNumEntries);
    }, fail);

    const query = testSearchTags.map((tag) => `searchTags=${tag}`).join('&');

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries/count?${query}`
    );

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush(testNumEntries);
  });

  it('#countEntries should return alert message', () => {
    service
      .countEntries()
      .subscribe(fail, (alertType: AlertType) =>
        expect(alertType).toEqual(AlertType.server)
      );

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries/count`
    );

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server',
    });
  });

  it('#getEntry should return diary entry', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service
      .getEntry(testDiaryEntry.id)
      .subscribe(
        (diaryEntry: DiaryEntry) => expect(diaryEntry).toEqual(testDiaryEntry),
        fail
      );

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries/${testDiaryEntry.id}`
    );

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush(testDiaryEntry);
  });

  it('#getEntry should return alert message', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service
      .getEntry(testDiaryEntry.id)
      .subscribe(fail, (alertType: AlertType) =>
        expect(alertType).toEqual(AlertType.server)
      );

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries/${testDiaryEntry.id}`
    );

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server',
    });
  });

  it('#saveEntry should return diary entry', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service
      .saveEntry(testDiaryEntry)
      .subscribe(
        (diaryEntry: DiaryEntry) => expect(diaryEntry).toEqual(testDiaryEntry),
        fail
      );

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries`
    );

    expect(testRequest.request.method).toMatch('POST');

    testRequest.flush(testDiaryEntry);
  });

  it('#saveEntry should return alert message', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service
      .saveEntry(testDiaryEntry)
      .subscribe(fail, (alertType: AlertType) =>
        expect(alertType).toEqual(alertType)
      );

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries`
    );

    expect(testRequest.request.method).toMatch('POST');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server',
    });
  });

  it('#updateEntry should return diary entry', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service.updateEntry(testDiaryEntry).subscribe((diaryEntry) => {
      expect(diaryEntry).toEqual(testDiaryEntry);
    }, fail);

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries/${testDiaryEntry.id}`
    );

    expect(testRequest.request.method).toMatch('PATCH');

    expect(testRequest.request.body).toEqual({
      title: testDiaryEntry.title,
      location: testDiaryEntry.location,
      body: testDiaryEntry.body,
      previewImage: testDiaryEntry.previewImage,
      images: testDiaryEntry.images,
      searchTags: testDiaryEntry.searchTags,
    });

    testRequest.flush(testDiaryEntry);
  });

  it('#updateEntry should return diary entry with preview image', () => {
    const testImage: Image = {
      id: '0',
      description: 'some description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const testDiaryEntry: DiaryEntry = {
      id: '2',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      previewImage: testImage,
      images: [testImage],
      searchTags: ['some search tag'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    service.updateEntry(testDiaryEntry).subscribe((diaryEntry) => {
      expect(diaryEntry).toEqual(testDiaryEntry);
    }, fail);

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries/${testDiaryEntry.id}`
    );

    expect(testRequest.request.method).toMatch('PATCH');

    expect(testRequest.request.body).toEqual({
      title: testDiaryEntry.title,
      location: testDiaryEntry.location,
      body: testDiaryEntry.body,
      previewImage: testImage.id,
      images: [testImage.id],
      searchTags: testDiaryEntry.searchTags,
    });

    testRequest.flush(testDiaryEntry);
  });

  it('#updateEntry should return alert message', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service
      .updateEntry(testDiaryEntry)
      .subscribe(fail, (alertType: AlertType) =>
        expect(alertType).toEqual(AlertType.server)
      );

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries/${testDiaryEntry.id}`
    );

    expect(testRequest.request.method).toMatch('PATCH');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server',
    });
  });

  it('#deleteEntry should return diary entry', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service
      .deleteEntry(testDiaryEntry.id)
      .subscribe(
        (diaryEntry: DiaryEntry) => expect(diaryEntry).toEqual(testDiaryEntry),
        fail
      );

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries/${testDiaryEntry.id}`
    );

    expect(testRequest.request.method).toMatch('DELETE');

    testRequest.flush(testDiaryEntry);
  });

  it('#deleteEntry should return alert message', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service
      .deleteEntry(testDiaryEntry.id)
      .subscribe(fail, (alertType: AlertType) =>
        expect(alertType).toEqual(AlertType.server)
      );

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries/${testDiaryEntry.id}`
    );

    expect(testRequest.request.method).toMatch('DELETE');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server',
    });
  });

  afterEach(() => httpTestingController.verify());
});
