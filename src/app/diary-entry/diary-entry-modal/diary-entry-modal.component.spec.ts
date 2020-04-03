/**
 * Unit tests for diary entry modal component
 * @packageDocumentation
 */

import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryModalComponent } from './diary-entry-modal.component';
import { DIARY_ENTRIES } from '../diary-entries';
import { Image } from '../../image/image.model';


@Component({
  selector: 'app-image-carousel',
  template: ''
})
class ImageCarouselStubComponent {
  @Input() imageList: Image[];
}


describe('DiaryEntryModalComponent', () => {
  let component: DiaryEntryModalComponent;
  let fixture: ComponentFixture<DiaryEntryModalComponent>;

  const testDiaryEntry = DIARY_ENTRIES[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DiaryEntryModalComponent,
        ImageCarouselStubComponent
      ],
      providers: [
        NgbActiveModal
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryModalComponent);
    component = fixture.componentInstance;
    component.diaryEntry = testDiaryEntry;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
