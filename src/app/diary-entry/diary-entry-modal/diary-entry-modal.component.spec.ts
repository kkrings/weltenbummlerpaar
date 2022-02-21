/**
 * Unit tests for diary entry modal component
 * @packageDocumentation
 */

import localeDe from '@angular/common/locales/de';

import { Component, Input, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { registerLocaleData, formatDate } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryModalComponent } from './diary-entry-modal.component';
import { DiaryEntry } from '../diary-entry.model';
import { Image } from '../../image/image.model';
import { MockNgbActiveModal } from '../../test-utils/test-utils.module';

registerLocaleData(localeDe);

/**
 * Mock image carousel component
 */
@Component({
  selector: 'app-image-carousel',
  template: '',
})
class MockImageCarouselComponent {
  /**
   * Mock list of diary entry's images
   */
  @Input() imageList: Image[] = [];
}

describe('DiaryEntryModalComponent', () => {
  let component: DiaryEntryModalComponent;
  let fixture: ComponentFixture<DiaryEntryModalComponent>;

  const testDiaryEntry: DiaryEntry = {
    id: '0',
    title: 'some title',
    location: 'some location',
    body: 'some body',
    images: [
      {
        id: '0',
        description: 'some description',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '1',
        description: 'some description',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    searchTags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [DiaryEntryModalComponent, MockImageCarouselComponent],
      providers: [
        { provide: NgbActiveModal, useClass: MockNgbActiveModal },
        { provide: LOCALE_ID, useValue: 'de' },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryModalComponent);
    component = fixture.componentInstance;
    component.diaryEntry = { ...testDiaryEntry };
    fixture.detectChanges();
  });

  it('#close should close the modal', () => {
    const modal: NgbActiveModal = TestBed.inject(NgbActiveModal);
    spyOn(modal, 'close');
    component.close();
    expect(modal.close).toHaveBeenCalled();
  });

  it("close button in modal's header should close the modal", () => {
    const closeButton = fixture.debugElement.query(
      By.css('.modal-header button')
    );
    spyOn(component, 'close');
    closeButton.triggerEventHandler('click', null);
    expect(component.close).toHaveBeenCalled();
  });

  it("close button in modal's footer should close the modal", () => {
    const closeButton = fixture.debugElement.query(
      By.css('.modal-footer button')
    );
    spyOn(component, 'close');
    closeButton.triggerEventHandler('click', null);
    expect(component.close).toHaveBeenCalled();
  });

  it("modal's header's title should show diary entry's title", () => {
    const modalTitle = fixture.debugElement.query(
      By.css('.modal-title')
    ).nativeElement;
    expect(modalTitle.textContent).toMatch(testDiaryEntry.title);
  });

  it("modal's body should show diary entry's images", () => {
    const imageCarousel = fixture.debugElement.query(
      By.directive(MockImageCarouselComponent)
    );
    const imageCarouselComponent = imageCarousel.injector.get(
      MockImageCarouselComponent
    );
    expect(imageCarouselComponent.imageList).toEqual(
      component.diaryEntry.images
    );
  });

  it("modal's body should not show empty list of images", () => {
    component.diaryEntry.images = [];
    fixture.detectChanges();
    const imageCarousel = fixture.debugElement.query(
      By.directive(MockImageCarouselComponent)
    );
    expect(imageCarousel).toBeNull();
  });

  it("modal's body should show diary entry's location name", () => {
    const location = fixture.debugElement.query(
      By.css('.modal-body > h6.text-secondary')
    ).nativeElement;
    expect(location.textContent).toMatch(testDiaryEntry.location);
  });

  it("modal's body should show diary entry's body", () => {
    const body = fixture.debugElement.query(
      By.css('.modal-body > p.text-pre-line')
    ).nativeElement;
    expect(body.textContent).toMatch(testDiaryEntry.body);
  });

  it("should not render diary entry's tags", () => {
    const searchTags = fixture.debugElement.queryAll(
      By.css('.modal-body .search-tag')
    );
    expect(searchTags.length).toEqual(0);
  });

  it("should render diary entry's tags", () => {
    component.diaryEntry.searchTags = ['some tag', 'some other tag'];
    fixture.detectChanges();
    const searchTags = fixture.debugElement.queryAll(
      By.css('.modal-body .search-tag')
    );
    const tags = searchTags.map((badge) =>
      badge.nativeElement.textContent.trim()
    );
    expect(tags).toEqual(component.diaryEntry.searchTags);
  });

  it("modal's body should show diary entry's creation date", () => {
    const createdAt = fixture.debugElement.query(
      By.css('.modal-body > p > small.text-muted')
    ).nativeElement;
    expect(createdAt.textContent).toContain(
      formatDate(testDiaryEntry.createdAt, 'mediumDate', 'de')
    );
  });
});
