/**
 * Unit tests for diary entry modal component
 * @packageDocumentation
 */

import { Component, Input, LOCALE_ID } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { registerLocaleData, formatDate } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryModalComponent } from './diary-entry-modal.component';
import { DIARY_ENTRIES } from '../diary-entries';
import { Image } from '../../image/image.model';


registerLocaleData(localeDe);


/**
 * Mock image carousel component
 */
@Component({
  selector: 'app-image-carousel',
  template: ''
})
class MockImageCarouselComponent {
  /**
   * Mock list of diary entry's images
   */
  @Input() imageList: Image[];
}

/**
 * Mock active modal
 */
class MockNgbActiveModal {
  /**
   * Mock the active modal's close method.
   */
  close(): void { }
}


describe('DiaryEntryModalComponent', () => {
  let component: DiaryEntryModalComponent;
  let fixture: ComponentFixture<DiaryEntryModalComponent>;

  const testDiaryEntry = DIARY_ENTRIES[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DiaryEntryModalComponent,
        MockImageCarouselComponent
      ],
      providers: [
        {provide: NgbActiveModal, useClass: MockNgbActiveModal},
        {provide: LOCALE_ID, useValue: 'de'}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryModalComponent);
    component = fixture.componentInstance;
    component.diaryEntry = testDiaryEntry;
    fixture.detectChanges();
  });

  it('#close should close the modal', () => {
    const modal: NgbActiveModal = TestBed.inject(NgbActiveModal);
    spyOn(modal, 'close');
    component.close();
    expect(modal.close).toHaveBeenCalled();
  });

  it('close button in modal\'s header should close the modal', () => {
    const closeButton = fixture.debugElement.query(
        By.css('.modal-header button'));

    spyOn(component, 'close');
    closeButton.triggerEventHandler('click', null);
    expect(component.close).toHaveBeenCalled();
  });

  it('close button in modal\'s footer should close the modal', () => {
    const closeButton = fixture.debugElement.query(
        By.css('.modal-footer button'));

    spyOn(component, 'close');
    closeButton.triggerEventHandler('click', null);
    expect(component.close).toHaveBeenCalled();
  });

  it('modal\'s header\'s title should show diary entry\'s title', () => {
    const modalTitle = fixture.debugElement
        .query(By.css('.modal-title'))
        .nativeElement;

    expect(modalTitle.textContent).toMatch(testDiaryEntry.title);
  });

  it('modal\'s body should show diary entry\'s location name', () => {
    const locationName = fixture.debugElement
        .query(By.css('.modal-body'))
        .children[1]
        .nativeElement;

    expect(locationName.textContent).toMatch(testDiaryEntry.locationName);
  });

  it('modal\'s body should show diary entry\'s body', () => {
    const body = fixture.debugElement
        .query(By.css('.modal-body'))
        .children[2]
        .nativeElement;

    expect(body.textContent).toMatch(testDiaryEntry.body);
  });

  it('modal\'s body should show diary entry\'s creation date', () => {
    const createdAt = fixture.debugElement
        .query(By.css('.modal-body'))
        .children[3]
        .nativeElement;

    expect(createdAt.textContent).toContain(formatDate(
        testDiaryEntry.createdAt, 'mediumDate', 'de'));
  });
});
