/**
 * Unit tests for diary entry service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { EntryService } from './entry.service';
import { AlertService } from './alert.service';
import { DiaryEntry } from './entry.model';
import { ENTRIES } from './mock-entries';
import { environment } from '../../environments/environment';


describe('EntryService', () => {
  let entryService: EntryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        EntryService,
        AlertService
      ]
    });

    entryService = TestBed.get(EntryService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('#getEntries should return diary entries', () => {
    entryService.getEntries().subscribe(
        (diaryEntries: DiaryEntry[]) => expect(diaryEntries).toEqual(ENTRIES),
        fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries?options[sort][createdAt]=-1`);

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush(ENTRIES);
  });

  it('#getEntries should return alert message', () => {
    entryService.getEntries().subscribe(
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
    const testEntry = ENTRIES[0];

    entryService.getEntry(testEntry._id).subscribe(
        (diaryEntry: DiaryEntry) => expect(diaryEntry).toEqual(testEntry),
        fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries/${testEntry._id}`);

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush(testEntry);
  });

  it('#getEntry should return alert message', () => {
    const testEntry = ENTRIES[0];

    entryService.getEntry(testEntry._id).subscribe(
        fail, (message: string) => expect(message).toBeDefined());

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries/${testEntry._id}`);

    expect(testRequest.request.method).toMatch('GET');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server'
    });
  });

  afterEach(() => httpTestingController.verify());
});
