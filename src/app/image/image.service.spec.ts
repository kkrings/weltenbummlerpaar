/**
 * Unit tests for image service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ImageService } from './image.service';
import { Image } from './image.model';
import { DiaryEntry } from '../diary-entry/diary-entry.model';
import { HttpAlertService } from '../http-alert/http-alert.service';
import { AlertType } from '../http-alert/alert.model';
import { environment } from '../../environments/environment';

describe('ImageService', () => {
  let service: ImageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService, HttpAlertService],
    });

    service = TestBed.inject(ImageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("#getImageUrl should return image's URL", () => {
    const image: Image = {
      id: '5e558e05834fb6e13158eb74',
      description: 'This is a mock image for testing.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(ImageService.getImageUrl(image)).toBe(
      `${environment.baseurl}/image-uploads/${image.id}.jpg`
    );
  });

  it('#uploadImage should return image', () => {
    const testEntry: DiaryEntry = {
      id: '0',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      searchTags: [],
      images: [
        {
          id: '0',
          description: 'This is a test image.',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const testImage: Image = {
      ...testEntry.images[0],
      file: new File([], 'testImage.jpg', { type: 'image/jpeg' }),
    };

    service
      .uploadImage(testEntry.id, testImage)
      .subscribe((entry: DiaryEntry) => expect(entry).toEqual(testEntry), fail);

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries/${testEntry.id}/images`
    );

    expect(testRequest.request.method).toMatch('POST');

    testRequest.flush(testEntry);
  });

  it('#uploadImage without file should throw', () => {
    const testEntryId = '0';

    const testImage: Image = {
      id: '0',
      description: 'This is a test image.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    service
      .uploadImage(testEntryId, testImage)
      .subscribe(fail, (error: string) => expect(error).toBeDefined());
  });

  it('#uploadImage should return alert message', () => {
    const testEntryId = '0';

    const testImage: Image = {
      file: new File([], 'testImage.jpg', { type: 'image/jpeg' }),
      id: '0',
      description: 'This is a test image.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    service
      .uploadImage(testEntryId, testImage)
      .subscribe(fail, (alertType: AlertType) =>
        expect(alertType).toEqual(AlertType.server)
      );

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries/${testEntryId}/images`
    );
    expect(testRequest.request.method).toMatch('POST');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server',
    });
  });

  it('#updateImage should return image', () => {
    const testImage: Image = {
      file: new File([], 'testImage.jpg', { type: 'image/jpeq' }),
      id: '0',
      description: 'This is a test image.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    service
      .updateImage(testImage)
      .subscribe((image: Image) => expect(image).toEqual(testImage), fail);

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/images/${testImage.id}`
    );
    expect(testRequest.request.method).toMatch('PATCH');

    testRequest.flush(testImage);
  });

  it('#updateImage without file should return image', () => {
    const testImage: Image = {
      id: '0',
      description: 'This is a test image.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    service
      .updateImage(testImage)
      .subscribe((image: Image) => expect(image).toEqual(testImage), fail);

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/images/${testImage.id}`
    );
    expect(testRequest.request.method).toMatch('PATCH');

    testRequest.flush(testImage);
  });

  it('#updateImage should return alert message', () => {
    const testImage: Image = {
      id: '0',
      description: 'This is a test image.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    service
      .updateImage(testImage)
      .subscribe(fail, (alertType: AlertType) =>
        expect(alertType).toEqual(AlertType.server)
      );

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/images/${testImage.id}`
    );
    expect(testRequest.request.method).toMatch('PATCH');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server',
    });
  });

  it('#delteImage should return image', () => {
    const testEntry: DiaryEntry = {
      id: '0',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      searchTags: [],
      images: [
        {
          id: '0',
          description: 'This is a test image.',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const testEntryId = testEntry.id;
    const testImage = testEntry.images[0];

    service
      .deleteImage(testEntryId, testImage.id)
      .subscribe((entry: DiaryEntry) => expect(entry).toEqual(testEntry), fail);

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries/${testEntryId}/images/${testImage.id}`
    );

    expect(testRequest.request.method).toMatch('DELETE');

    testRequest.flush(testEntry);
  });

  it('#deleteImage should return alert message', () => {
    const testEntryId = '0';

    const testImage: Image = {
      id: '0',
      description: 'This is a test image.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    service
      .deleteImage(testEntryId, testImage.id)
      .subscribe(fail, (alertType: AlertType) =>
        expect(alertType).toEqual(AlertType.server)
      );

    const testRequest = httpTestingController.expectOne(
      `${environment.baseurl}/rest/diary-entries/${testEntryId}/images/${testImage.id}`
    );

    expect(testRequest.request.method).toMatch('DELETE');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server',
    });
  });

  afterEach(() => httpTestingController.verify());
});
