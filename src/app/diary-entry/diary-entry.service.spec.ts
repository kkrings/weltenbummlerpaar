/**
 * Unit tests for diary entry service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';

import { DiaryEntryService } from './diary-entry.service';
import { DiaryEntry } from './diary-entry.model';
import { HttpAlertService } from '../shared/http-alert.service';
import { environment } from '../../environments/environment';


describe('DiaryEntryService', () => {
  let service: DiaryEntryService;
  let httpTestingController: HttpTestingController;

  const testDiaryEntries: DiaryEntry[] = [{
    _id: '0',
    title: 'some title',
    locationName: 'some location',
    body: 'some body',
    images: [],
    tags: [],
    createdAt: (new Date()).toISOString(),
    updatedAt: (new Date()).toISOString()
  }, {
    _id: '1',
    title: 'some title',
    locationName: 'some location',
    body: 'some body',
    images: [],
    tags: [],
    createdAt: (new Date()).toISOString(),
    updatedAt: (new Date()).toISOString()
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DiaryEntryService,
        HttpAlertService
      ]
    });

    service = TestBed.inject(DiaryEntryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('#getEntries should return diary entries', () => {
    service.getEntries().subscribe(
        (diaryEntries: DiaryEntry[]) => {
          expect(diaryEntries).toEqual(testDiaryEntries);
        },
        fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries?options[sort][createdAt]=-1`);

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush(testDiaryEntries);
  });

  it('#getEntries should return alert message', () => {
    service.getEntries().subscribe(
        fail, (message: string) => expect(message).toBeDefined());

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries?options[sort][createdAt]=-1`);

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server'
    });
  });

  it('#getEntry should return diary entry', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service.getEntry(testDiaryEntry._id).subscribe(
        (diaryEntry: DiaryEntry) => expect(diaryEntry).toEqual(testDiaryEntry),
        fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries/${testDiaryEntry._id}`);

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush(testDiaryEntry);
  });

  it('#getEntry should return alert message', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service.getEntry(testDiaryEntry._id).subscribe(
        fail, (message: string) => expect(message).toBeDefined());

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries/${testDiaryEntry._id}`);

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server'
    });
  });

  it('#saveEntry should return diary entry', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service.saveEntry(testDiaryEntry).subscribe(
        (diaryEntry: DiaryEntry) => expect(diaryEntry).toEqual(testDiaryEntry),
        fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries`);

    expect(testRequest.request.method).toMatch('POST');

    testRequest.flush(testDiaryEntry);
  });

  it('#saveEntry should return alert message', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service.saveEntry(testDiaryEntry).subscribe(
        fail, (message: string) => expect(message).toBeDefined());

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries`);

    expect(testRequest.request.method).toMatch('POST');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server'
    });
  });

  it('#updateEntry should return diary entry', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service.updateEntry(testDiaryEntry).subscribe(
        (diaryEntry: DiaryEntry) => expect(diaryEntry).toEqual(testDiaryEntry),
        fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries/${testDiaryEntry._id}`);

    expect(testRequest.request.method).toMatch('PUT');

    testRequest.flush(testDiaryEntry);
  });

  it('#updateEntry should return alert message', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service.updateEntry(testDiaryEntry).subscribe(
        fail, (message: string) => expect(message).toBeDefined());

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries/${testDiaryEntry._id}`);

    expect(testRequest.request.method).toMatch('PUT');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server'
    });
  });

  it('#deleteEntry should return diary entry', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service.deleteEntry(testDiaryEntry._id).subscribe(
        (diaryEntry: DiaryEntry) => expect(diaryEntry).toEqual(testDiaryEntry),
        fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries/${testDiaryEntry._id}`);

    expect(testRequest.request.method).toMatch('DELETE');

    testRequest.flush(testDiaryEntry);
  });

  it('#deleteEntry should return alert message', () => {
    const testDiaryEntry = testDiaryEntries[0];

    service.deleteEntry(testDiaryEntry._id).subscribe(
        fail, (message: string) => expect(message).toBeDefined());

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries/${testDiaryEntry._id}`);

    expect(testRequest.request.method).toMatch('DELETE');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server'
    });
  });

  afterEach(() => httpTestingController.verify());
});
