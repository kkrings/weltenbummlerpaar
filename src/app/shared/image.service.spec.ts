/**
 * Unit tests for image service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ImageService } from './image.service';
import { Image } from './image.model';
import { HttpAlertService } from './http-alert.service';
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

  it('#uploadImage should return image', () => {
    const testImage: Image = {
      _id: '0',
      description: 'This is a test image.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    const imageFormData = new FormData();
    imageFormData.append('description', testImage.description);

    service.uploadImage(imageFormData).subscribe(
        (image: Image) => expect(image).toEqual(testImage),
        fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/images/upload`);

    expect(testRequest.request.method).toMatch('POST');

    testRequest.flush(testImage);
  });

  it('#uploadImage should return alert message', () => {
    const testImage: Image = {
      _id: '0',
      description: 'This is a test image.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    const imageFormData = new FormData();
    imageFormData.append('description', testImage.description);

    service.uploadImage(imageFormData).subscribe(
        fail, (message: string) => expect(message).toBeDefined());

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/images/upload`);

    expect(testRequest.request.method).toMatch('POST');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server'
    });
  });

  it('#updateImage should return image', () => {
    const testImage: Image = {
      _id: '0',
      description: 'This is a test image.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    const imageFormData = new FormData();
    imageFormData.append('description', testImage.description);

    service.updateImage(testImage._id, imageFormData).subscribe(
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

    const imageFormData = new FormData();
    imageFormData.append('description', testImage.description);

    service.updateImage(testImage._id, imageFormData).subscribe(
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
    const testImage: Image = {
      _id: '0',
      description: 'This is a test image.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    service.deleteImage(testImage._id).subscribe(
        (image: Image) => expect(image).toEqual(testImage),
        fail);

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/images/${testImage._id}`);

    expect(testRequest.request.method).toMatch('DELETE');

    testRequest.flush(testImage);
  });

  it('#deleteImage should return alert message', () => {
    const testImage: Image = {
      _id: '0',
      description: 'This is a test image.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    service.deleteImage(testImage._id).subscribe(
        fail, (message: string) => expect(message).toBeDefined());

    const testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/db/images/${testImage._id}`);

    expect(testRequest.request.method).toMatch('DELETE');

    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server'
    });
  });

  afterEach(() => httpTestingController.verify());
});
