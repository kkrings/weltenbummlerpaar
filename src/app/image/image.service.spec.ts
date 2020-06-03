/**
 * Unit tests for image service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import * as Jimp from 'jimp';

import { ImageService } from './image.service';
import { Image } from './image.model';
import { HttpAlertService } from '../shared/http-alert.service';
import { environment } from '../../environments/environment';


describe('ImageService', () => {
  let service: ImageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ImageService,
        HttpAlertService
      ]
    });

    service = TestBed.inject(ImageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('#getImageUrl should return image\'s URL', () => {
    const image: Image = {
      _id: '5e558e05834fb6e13158eb74',
      description: 'This is a mock image for testing.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    expect(ImageService.getImageUrl(image))
        .toBe(`${environment.baseurl}/images/${image._id}.jpg`);
  });

  it('#uploadImage should return image', async () => {
    const testEntryId = '0';

    const buffer = await (new Jimp(16, 16)).getBufferAsync(Jimp.MIME_JPEG);

    const testImage: Image = {
      file: new File([buffer], 'testImage.jpg'),
      _id: '0',
      description: 'This is a test image.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    service.uploadImage(testEntryId, testImage).subscribe(
        (image: Image) => expect(image).toEqual(testImage),
        fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries/${testEntryId}/images`);

    expect(testRequest.request.method).toMatch('POST');

    testRequest.flush(testImage);
  });

  it('#uploadImage without file should throw', () => {
    const testEntryId = '0';

    const testImage: Image = {
      _id: '0',
      description: 'This is a test image.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    service.uploadImage(testEntryId, testImage).subscribe(
        fail, (error: string) => expect(error).toBeDefined());
  });

  it('#uploadImage should return alert message', async () => {
    const testEntryId = '0';

    const buffer = await (new Jimp(16, 16)).getBufferAsync(Jimp.MIME_JPEG);

    const testImage: Image = {
      file: new File([buffer], 'testImage.jpg'),
      _id: '0',
      description: 'This is a test image.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    service.uploadImage(testEntryId, testImage).subscribe(
        fail, (message: string) => expect(message).toBeDefined());

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/entries/${testEntryId}/images`);

    expect(testRequest.request.method).toMatch('POST');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server'
    });
  });

  it('#updateImage should return image', async () => {
    const buffer = await (new Jimp(16, 16)).getBufferAsync(Jimp.MIME_JPEG);

    const testImage: Image = {
      file: new File([buffer], 'testImage.jpg'),
      _id: '0',
      description: 'This is a test image.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    service.updateImage(testImage).subscribe(
        (image: Image) => expect(image).toEqual(testImage),
        fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/images/${testImage._id}`);

    expect(testRequest.request.method).toMatch('PUT');

    testRequest.flush(testImage);
  });

  it('#updateImage without file should return image', () => {
    const testImage: Image = {
      _id: '0',
      description: 'This is a test image.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    service.updateImage(testImage).subscribe(
        (image: Image) => expect(image).toEqual(testImage),
        fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/images/${testImage._id}`);

    expect(testRequest.request.method).toMatch('PUT');

    testRequest.flush(testImage);
  });

  it('#updateImage should return alert message', () => {
    const testImage: Image = {
      _id: '0',
      description: 'This is a test image.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    service.updateImage(testImage).subscribe(
        fail, (message: string) => expect(message).toBeDefined());

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/images/${testImage._id}`);

    expect(testRequest.request.method).toMatch('PUT');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server'
    });
  });

  it('#delteImage should return image', () => {
    const testEntryId = '0';

    const testImage: Image = {
      _id: '0',
      description: 'This is a test image.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    service.deleteImage(testEntryId, testImage._id).subscribe(
        (image: Image) => expect(image).toEqual(testImage),
        fail);

    const testRequest = httpTestingController.expectOne(
        environment.baseurl +
            `/db/entries/${testEntryId}/images/${testImage._id}`);

    expect(testRequest.request.method).toMatch('DELETE');

    testRequest.flush(testImage);
  });

  it('#deleteImage should return alert message', () => {
    const testEntryId = '0';

    const testImage: Image = {
      _id: '0',
      description: 'This is a test image.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    service.deleteImage(testEntryId, testImage._id).subscribe(
        fail, (message: string) => expect(message).toBeDefined());

    const testRequest = httpTestingController.expectOne(
        environment.baseurl +
            `/db/entries/${testEntryId}/images/${testImage._id}`);

    expect(testRequest.request.method).toMatch('DELETE');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server'
    });
  });

  afterEach(() => httpTestingController.verify());
});
