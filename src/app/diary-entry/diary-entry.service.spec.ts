/**
 * Unit tests for diary entry service
 * @packageDocumentation
 */

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { DateRange } from '../date-range/date-range.model';
import { AlertType } from '../http-alert/alert.model';
import { HttpAlertService } from '../http-alert/http-alert.service';
import { Image } from '../image/image.model';
import { DiaryEntry } from './diary-entry.model';
import { DiaryEntryService } from './diary-entry.service';

describe('DiaryEntryService', () => {
  let service: DiaryEntryService;
  let httpTestingController: HttpTestingController;

  let testDiaryEntry: DiaryEntry;
  let testDiaryEntryBody: DiaryEntry;
  let withImage: DiaryEntry;
  let withImageBody: DiaryEntry;
  let withDateRange: DiaryEntry;
  let withDateRangeBody: DiaryEntry;

  const flushTestDiaryEntry = (testRequest: TestRequest): void =>
    testRequest.flush(testDiaryEntryBody);

  const flushWithImage = (testRequest: TestRequest): void =>
    testRequest.flush(withImageBody);

  const flushWithDateRange = (testRequest: TestRequest): void =>
    testRequest.flush(withDateRangeBody);

  const flushTestError = (testRequest: TestRequest): void =>
    testRequest.flush('mock HTTP error response', {
      status: 500,
      statusText: 'Mock error on back-end server',
    });

  beforeEach(() => {
    testDiaryEntry = {
      id: '0',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      searchTags: ['some tag', 'some other tag'],
      images: [],
      createdAt: new Date('2020-02-14').toISOString(),
      updatedAt: new Date('2020-02-14').toISOString(),
    };

    testDiaryEntryBody = { ...testDiaryEntry };
  });

  beforeEach(() => {
    const image: Image = {
      id: '0',
      description: 'some description',
      createdAt: new Date('2020-02-14').toISOString(),
      updatedAt: new Date('2020-02-14').toISOString(),
    };

    withImage = {
      ...testDiaryEntry,
      previewImage: image,
      images: [image],
    };

    withImageBody = {
      ...testDiaryEntry,
      previewImage: { ...image },
      images: [{ ...image }],
    };
  });

  beforeEach(() => {
    const dateRange: DateRange = {
      dateMin: '2020-02-14',
      dateMax: '2020-02-14',
    };

    withDateRange = {
      ...testDiaryEntry,
      dateRange: dateRange,
    };

    withDateRangeBody = {
      ...testDiaryEntry,
      dateRange: {
        dateMin: new Date(dateRange.dateMin).toISOString(),
        dateMax: new Date(dateRange.dateMax).toISOString(),
      },
    };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DiaryEntryService, HttpAlertService],
    });

    service = TestBed.inject(DiaryEntryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('#getEntry', () => {
    let testRequest: TestRequest;
    let diaryEntry: DiaryEntry | null;
    let alertType: AlertType | null;

    beforeEach(() => {
      diaryEntry = null;
      alertType = null;
    });

    beforeEach(() => {
      service.getEntry(testDiaryEntry.id).subscribe(
        (entry) => (diaryEntry = entry),
        (alert) => (alertType = alert)
      );
    });

    beforeEach(() => {
      testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/rest/diary-entries/${testDiaryEntry.id}`
      );
    });

    beforeEach(() => {
      expect(testRequest.request.method).toMatch('GET');
    });

    describe('#flushTestDiaryEntry', () => {
      beforeEach(() => {
        flushTestDiaryEntry(testRequest);
      });

      it('#diaryEntry should be equal to #testDiaryEntry', () => {
        expect(diaryEntry).toEqual(testDiaryEntry);
      });

      it('#alertType should be null', () => {
        expect(alertType).toBeNull();
      });
    });

    describe('#flushWithImage', () => {
      beforeEach(() => {
        flushWithImage(testRequest);
      });

      it('#diaryEntry should be equal to #withImage', () => {
        expect(diaryEntry).toEqual(withImage);
      });

      it('#diaryEntry.previewImage should be #diaryEntry.images[0]', () => {
        expect(diaryEntry?.previewImage).toBe(diaryEntry?.images[0]);
      });

      it('#alertType should be null', () => {
        expect(alertType).toBeNull();
      });
    });

    describe('#flushWithDateRange', () => {
      beforeEach(() => {
        flushWithDateRange(testRequest);
      });

      it('#diaryEntry should be equal to #withDateRange', () => {
        expect(diaryEntry).toEqual(withDateRange);
      });

      it('#alertType should be null', () => {
        expect(alertType).toBeNull();
      });
    });

    describe('#flushTestError', () => {
      beforeEach(() => {
        flushTestError(testRequest);
      });

      it('#diaryEntry should be null', () => {
        expect(diaryEntry).toBeNull();
      });

      it('#alertType should be equal to #AlertType.server', () => {
        expect(alertType).toEqual(AlertType.server);
      });
    });
  });

  describe('#saveEntry', () => {
    let testRequest: TestRequest;
    let diaryEntry: DiaryEntry | null;
    let alertType: AlertType | null;

    beforeEach(() => {
      diaryEntry = null;
      alertType = null;
    });

    describe('#testDiaryEntry', () => {
      beforeEach(() => {
        service.saveEntry(testDiaryEntry).subscribe(
          (entry) => (diaryEntry = entry),
          (alert) => (alertType = alert)
        );
      });

      beforeEach(() => {
        testRequest = httpTestingController.expectOne(
          `${environment.baseurl}/rest/diary-entries`
        );
      });

      beforeEach(() => {
        expect(testRequest.request.method).toMatch('POST');
      });

      beforeEach(() => {
        expect(testRequest.request.body).toEqual({
          title: testDiaryEntry.title,
          location: testDiaryEntry.location,
          dateRange: testDiaryEntry.dateRange,
          body: testDiaryEntry.body,
          images: testDiaryEntry.images,
          searchTags: testDiaryEntry.searchTags,
        });
      });

      describe('#flushTestDiaryEntry', () => {
        beforeEach(() => {
          flushTestDiaryEntry(testRequest);
        });

        it('#diaryEntry should be equal to #testDiaryEntry', () => {
          expect(diaryEntry).toEqual(testDiaryEntry);
        });

        it('#alertType should be null', () => {
          expect(alertType).toBeNull();
        });
      });

      describe('#flushTestError', () => {
        beforeEach(() => {
          flushTestError(testRequest);
        });

        it('#diaryEntry should be null', () => {
          expect(diaryEntry).toBeNull();
        });

        it('#alertType should be equal to #AlertType.server', () => {
          expect(alertType).toEqual(AlertType.server);
        });
      });
    });

    describe('#withDateRange', () => {
      beforeEach(() => {
        service.saveEntry(withDateRange).subscribe(
          (entry) => (diaryEntry = entry),
          (alert) => (alertType = alert)
        );
      });

      beforeEach(() => {
        testRequest = httpTestingController.expectOne(
          `${environment.baseurl}/rest/diary-entries`
        );
      });

      beforeEach(() => {
        expect(testRequest.request.method).toMatch('POST');
      });

      beforeEach(() => {
        expect(testRequest.request.body).toEqual({
          title: withDateRange.title,
          location: withDateRange.location,
          dateRange: withDateRange.dateRange,
          body: withDateRange.body,
          images: withDateRange.images,
          searchTags: withDateRange.searchTags,
        });
      });

      beforeEach(() => {
        flushWithDateRange(testRequest);
      });

      it('#diaryEntry should be equal to #withDateRange', () => {
        expect(diaryEntry).toEqual(withDateRange);
      });

      it('#alertType should be null', () => {
        expect(alertType).toBeNull();
      });
    });
  });

  describe('#updateEntry', () => {
    let testRequest: TestRequest;
    let diaryEntry: DiaryEntry | null;
    let alertType: AlertType | null;

    beforeEach(() => {
      diaryEntry = null;
      alertType = null;
    });

    describe('#testDiaryEntry', () => {
      beforeEach(() => {
        service.updateEntry(testDiaryEntry).subscribe(
          (entry) => (diaryEntry = entry),
          (alert) => (alertType = alert)
        );
      });

      beforeEach(() => {
        testRequest = httpTestingController.expectOne(
          `${environment.baseurl}/rest/diary-entries/${testDiaryEntry.id}`
        );
      });

      beforeEach(() => {
        expect(testRequest.request.method).toMatch('PATCH');
      });

      beforeEach(() => {
        expect(testRequest.request.body).toEqual({
          title: testDiaryEntry.title,
          location: testDiaryEntry.location,
          dateRange: testDiaryEntry.dateRange,
          body: testDiaryEntry.body,
          previewImage: testDiaryEntry.previewImage,
          images: testDiaryEntry.images,
          searchTags: testDiaryEntry.searchTags,
        });
      });

      describe('#flushTestDiaryEntry', () => {
        beforeEach(() => {
          flushTestDiaryEntry(testRequest);
        });

        it('#diaryEntry should be equal to #testDiaryEntry', () => {
          expect(diaryEntry).toEqual(testDiaryEntry);
        });

        it('#alertType should be null', () => {
          expect(alertType).toBeNull();
        });
      });

      describe('#flushTestError', () => {
        beforeEach(() => {
          flushTestError(testRequest);
        });

        it('#diaryEntry should be null', () => {
          expect(diaryEntry).toBeNull();
        });

        it('#alertType should be equal to #AlertType.server', () => {
          expect(alertType).toEqual(AlertType.server);
        });
      });
    });

    describe('#withImage', () => {
      beforeEach(() => {
        service.updateEntry(withImage).subscribe(
          (entry) => (diaryEntry = entry),
          (alert) => (alertType = alert)
        );
      });

      beforeEach(() => {
        testRequest = httpTestingController.expectOne(
          `${environment.baseurl}/rest/diary-entries/${withImage.id}`
        );
      });

      beforeEach(() => {
        expect(testRequest.request.method).toMatch('PATCH');
      });

      beforeEach(() => {
        expect(testRequest.request.body).toEqual({
          title: withImage.title,
          location: withImage.location,
          dateRange: withImage.dateRange,
          body: withImage.body,
          previewImage: withImage.previewImage?.id,
          images: withImage.images.map((image) => image.id),
          searchTags: withImage.searchTags,
        });
      });

      beforeEach(() => {
        flushWithImage(testRequest);
      });

      it('#diaryEntry should be equal to #withImage', () => {
        expect(diaryEntry).toEqual(withImage);
      });

      it('#diaryEntry.previewImage should be #diaryEntry.images[0]', () => {
        expect(diaryEntry?.previewImage).toBe(diaryEntry?.images[0]);
      });

      it('#alertType should be null', () => {
        expect(alertType).toBeNull();
      });
    });

    describe('#withDateRange', () => {
      beforeEach(() => {
        service.updateEntry(withDateRange).subscribe(
          (entry) => (diaryEntry = entry),
          (alert) => (alertType = alert)
        );
      });

      beforeEach(() => {
        testRequest = httpTestingController.expectOne(
          `${environment.baseurl}/rest/diary-entries/${withDateRange.id}`
        );
      });

      beforeEach(() => {
        expect(testRequest.request.method).toMatch('PATCH');
      });

      beforeEach(() => {
        expect(testRequest.request.body).toEqual({
          title: withDateRange.title,
          location: withDateRange.location,
          dateRange: withDateRange.dateRange,
          body: withDateRange.body,
          previewImage: withDateRange.previewImage,
          images: withDateRange.images,
          searchTags: withDateRange.searchTags,
        });
      });

      beforeEach(() => {
        flushWithDateRange(testRequest);
      });

      it('#diaryEntry should be equal to #withDateRange', () => {
        expect(diaryEntry).toEqual(withDateRange);
      });

      it('#alertType should be null', () => {
        expect(alertType).toBeNull();
      });
    });
  });

  describe('#deleteEntry', () => {
    let testRequest: TestRequest;
    let diaryEntry: DiaryEntry | null;
    let alertType: AlertType | null;

    beforeEach(() => {
      diaryEntry = null;
      alertType = null;
    });

    beforeEach(() => {
      service.deleteEntry(testDiaryEntry.id).subscribe(
        (entry) => (diaryEntry = entry),
        (alert) => (alertType = alert)
      );
    });

    beforeEach(() => {
      testRequest = httpTestingController.expectOne(
        `${environment.baseurl}/rest/diary-entries/${testDiaryEntry.id}`
      );
    });

    beforeEach(() => {
      expect(testRequest.request.method).toMatch('DELETE');
    });

    describe('#flushTestDiaryEntry', () => {
      beforeEach(() => {
        flushTestDiaryEntry(testRequest);
      });

      it('#diaryEntry should be equal to #testDiaryEntry', () => {
        expect(diaryEntry).toEqual(testDiaryEntry);
      });

      it('#alertType should be null', () => {
        expect(alertType).toBeNull();
      });
    });

    describe('#flushWithImage', () => {
      beforeEach(() => {
        flushWithImage(testRequest);
      });

      it('#diaryEntry should be equal to #withImage', () => {
        expect(diaryEntry).toEqual(withImage);
      });

      it('#diaryEntry.previewImage should be #diaryEntry.images[0]', () => {
        expect(diaryEntry?.previewImage).toBe(diaryEntry?.images[0]);
      });

      it('#alertType should be null', () => {
        expect(alertType).toBeNull();
      });
    });

    describe('#flushWithDateRange', () => {
      beforeEach(() => {
        flushWithDateRange(testRequest);
      });

      it('#diaryEntry should be equal to #withDateRange', () => {
        expect(diaryEntry).toEqual(withDateRange);
      });

      it('#alertType should be null', () => {
        expect(alertType).toBeNull();
      });
    });

    describe('#flushTestError', () => {
      beforeEach(() => {
        flushTestError(testRequest);
      });

      it('#diaryEntry should be null', () => {
        expect(diaryEntry).toBeNull();
      });

      it('#alertType should be equal to #AlertType.server', () => {
        expect(alertType).toEqual(AlertType.server);
      });
    });
  });

  describe('#getEntries', () => {
    let testDiaryEntries: DiaryEntry[];

    let testRequest: TestRequest;
    let diaryEntries: DiaryEntry[] | null;
    let alertType: AlertType | null;

    const flushTestDiaryEntries = (testRequest: TestRequest): void =>
      testRequest.flush([testDiaryEntryBody, withImageBody, withDateRangeBody]);

    beforeEach(() => {
      testDiaryEntries = [testDiaryEntry, withImage, withDateRange];
    });

    beforeEach(() => {
      diaryEntries = null;
      alertType = null;
    });

    describe('#getEntries()', () => {
      beforeEach(() => {
        service.getEntries().subscribe(
          (entries) => (diaryEntries = entries),
          (alert) => (alertType = alert)
        );
      });

      beforeEach(() => {
        testRequest = httpTestingController.expectOne(
          `${environment.baseurl}/rest/diary-entries`
        );
      });

      beforeEach(() => {
        expect(testRequest.request.method).toMatch('GET');
      });

      describe('#flushTestDiaryEntries', () => {
        beforeEach(() => {
          flushTestDiaryEntries(testRequest);
        });

        it('#diaryEntries should be equal to #testDiaryEntries', () => {
          expect(diaryEntries).toEqual(testDiaryEntries);
        });

        it('#diaryEntries[1].previewImage should be #diaryEntries[1].images[0]', () => {
          const diaryEntry = diaryEntries?.[1];
          expect(diaryEntry?.previewImage).toBe(diaryEntry?.images[0]);
        });

        it('#alertType should be null', () => {
          expect(alertType).toBeNull();
        });
      });

      describe('#flushTestError', () => {
        beforeEach(() => {
          flushTestError(testRequest);
        });

        it('#diaryEntries should be null', () => {
          expect(diaryEntries).toBeNull();
        });

        it('#alertType should be equal to #AlertType.server', () => {
          expect(alertType).toEqual(AlertType.server);
        });
      });
    });

    describe('#getEntries(#searchTags)', () => {
      beforeEach(() => {
        service.getEntries(testDiaryEntry.searchTags).subscribe(
          (entries) => (diaryEntries = entries),
          (alert) => (alertType = alert)
        );
      });

      beforeEach(() => {
        const query = 'searchTags=some tag&searchTags=some other tag';

        testRequest = httpTestingController.expectOne(
          `${environment.baseurl}/rest/diary-entries?${query}`
        );
      });

      beforeEach(() => {
        expect(testRequest.request.method).toMatch('GET');
      });

      beforeEach(() => {
        flushTestDiaryEntries(testRequest);
      });

      it('#diaryEntries should be equal to #testDiaryEntries', () => {
        expect(diaryEntries).toEqual(testDiaryEntries);
      });

      it('#alertType should be null', () => {
        expect(alertType).toBeNull();
      });
    });

    describe('#getEntries([], #skip, #limit)', () => {
      const skip = 5;
      const limit = 10;

      beforeEach(() => {
        service.getEntries([], skip, limit).subscribe(
          (entries) => (diaryEntries = entries),
          (alert) => (alertType = alert)
        );
      });

      beforeEach(() => {
        const query = `skipDiaryEntries=${skip}&numDiaryEntries=${limit}`;

        testRequest = httpTestingController.expectOne(
          `${environment.baseurl}/rest/diary-entries?${query}`
        );
      });

      beforeEach(() => {
        expect(testRequest.request.method).toMatch('GET');
      });

      beforeEach(() => {
        flushTestDiaryEntries(testRequest);
      });

      it('#diaryEntries should be equal to #testDiaryEntries', () => {
        expect(diaryEntries).toEqual(testDiaryEntries);
      });

      it('#alertType should be null', () => {
        expect(alertType).toBeNull();
      });
    });
  });

  describe('#countEntries', () => {
    const testNumDiaryEntries = 10;

    let testRequest: TestRequest;
    let numDiaryEntries: number | null;
    let alertType: AlertType | null;

    beforeEach(() => {
      numDiaryEntries = null;
      alertType = null;
    });

    describe('#countEntries()', () => {
      beforeEach(() => {
        service.countEntries().subscribe(
          (numEntries) => (numDiaryEntries = numEntries),
          (alert) => (alertType = alert)
        );
      });

      beforeEach(() => {
        testRequest = httpTestingController.expectOne(
          `${environment.baseurl}/rest/diary-entries/count`
        );
      });

      beforeEach(() => {
        expect(testRequest.request.method).toMatch('GET');
      });

      describe('#testRequest.flush(#testNumDiaryEntries)', () => {
        beforeEach(() => {
          testRequest.flush(testNumDiaryEntries);
        });

        it('#numDiaryEntries should be equal to #testNumDiaryEntries', () => {
          expect(numDiaryEntries).toEqual(testNumDiaryEntries);
        });

        it('#alertType should be null', () => {
          expect(alertType).toBeNull();
        });
      });

      describe('#flushTestError', () => {
        beforeEach(() => {
          flushTestError(testRequest);
        });

        it('#numDiaryEntries should be null', () => {
          expect(numDiaryEntries).toBeNull();
        });

        it('#alertType should be equal to #AlertType.server', () => {
          expect(alertType).toEqual(AlertType.server);
        });
      });
    });

    describe('#countEntries(#searchTags)', () => {
      beforeEach(() => {
        service.countEntries(testDiaryEntry.searchTags).subscribe(
          (numEntries) => (numDiaryEntries = numEntries),
          (alert) => (alertType = alert)
        );
      });

      beforeEach(() => {
        const query = 'searchTags=some tag&searchTags=some other tag';

        testRequest = httpTestingController.expectOne(
          `${environment.baseurl}/rest/diary-entries/count?${query}`
        );
      });

      beforeEach(() => {
        expect(testRequest.request.method).toMatch('GET');
      });

      beforeEach(() => {
        testRequest.flush(testNumDiaryEntries);
      });

      it('#numDiaryEntries should be equal to #testNumDiaryEntries', () => {
        expect(numDiaryEntries).toEqual(testNumDiaryEntries);
      });

      it('#alertType should be null', () => {
        expect(alertType).toBeNull();
      });
    });
  });

  afterEach(() => httpTestingController.verify());
});
