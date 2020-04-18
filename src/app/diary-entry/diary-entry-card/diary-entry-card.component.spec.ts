/**
 * Unit tests for diary entry card component
 * @packageDocumentation
 */

import { Directive, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryCardComponent } from './diary-entry-card.component';
import { DiaryEntryBriefPipe } from '../diary-entry-brief.pipe';
import { DiaryEntryService } from '../diary-entry.service';
import { DIARY_ENTRIES } from '../diary-entries';


/**
 * Mock authentication directive
 */
@Directive({
  selector: '[appAuth]'
})
class MockAuthDirective {}

/**
 * Mock image directive
 */
@Directive({
  selector: '[appImage]'
})
class MockImageDirective {
  /**
   * Mock image
   */
  @Input('appImage') mockImage = null;
}


describe('DiaryEntryCardComponent', () => {
  let component: DiaryEntryCardComponent;
  let fixture: ComponentFixture<DiaryEntryCardComponent>;
  let service: jasmine.SpyObj<DiaryEntryService>;

  const testDiaryEntry = DIARY_ENTRIES[0];

  beforeEach(async(() => {
    const serviceSpy = jasmine.createSpyObj(
        'DiaryEntryService', ['deleteEntry']);

    serviceSpy.deleteEntry.and.returnValue(of(testDiaryEntry));

    TestBed.configureTestingModule({
      declarations: [
        DiaryEntryCardComponent,
        DiaryEntryBriefPipe,
        MockAuthDirective,
        MockImageDirective
      ],
      providers: [
        {provide: DiaryEntryService, useValue: serviceSpy}
      ],
      imports: [
        NgbAlertModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryCardComponent);
    component = fixture.componentInstance;
    component.diaryEntry = testDiaryEntry;
    fixture.detectChanges();
  });

  it('should render diary entry\'s title', () => {
    const cardTitle = fixture.debugElement.query(By.css('.card-title'));
    expect(cardTitle.nativeElement.textContent).toMatch(testDiaryEntry.title);
  });

  it('should render diary entry\'s location name', () => {
    const cardSubtitle = fixture.debugElement.query(By.css('.card-subtitle'));

    expect(cardSubtitle.nativeElement.textContent)
        .toMatch(testDiaryEntry.locationName);
  });

  it('should not render empty alert message', () => {
    const alert = fixture.debugElement.query(By.css('ngb-alert'));
    expect(alert).toBeNull();
  });

  it('should render alert message', () => {
    const alertMessage = 'This is a mock alert message';
    component.alertMessage = alertMessage;
    fixture.detectChanges();
    const alert = fixture.debugElement.query(By.css('ngb-alert'));
    expect(alert.nativeElement.textContent).toMatch(alertMessage);
  });

  it('#deleteEntry should emit deleted entry', () => {
    service = TestBed.inject(DiaryEntryService) as
        jasmine.SpyObj<DiaryEntryService>;

    let deletedEntryId = '';

    component.deletedEntryId.subscribe((entryId: string) => {
      deletedEntryId = entryId;
    });

    component.deleteEntry();
    expect(deletedEntryId).toMatch(testDiaryEntry._id);
    expect(service.deleteEntry).toHaveBeenCalledWith(testDiaryEntry._id);
  });

  it('#deleteEntry should reset alert message', () => {
    component.alertMessage = 'This is mock alert message.';
    component.deleteEntry();
    expect(component.alertMessage).toMatch('');
  });

  it('#deleteEntry should set alert message', () => {
    service = TestBed.inject(DiaryEntryService) as
        jasmine.SpyObj<DiaryEntryService>;

    const alertMessage = 'This is a mock error observable.';
    service.deleteEntry.and.returnValue(throwError(alertMessage));

    component.deleteEntry();

    expect(component.alertMessage).toMatch(alertMessage);
    expect(service.deleteEntry).toHaveBeenCalledWith(testDiaryEntry._id);
  });

  it('delete button should trigger #deletedEntry', () => {
    spyOn(component, 'deleteEntry');

    const deleteButton = fixture.debugElement.query(
        By.css('.card-header .btn-danger'));

    deleteButton.triggerEventHandler('click', null);
    expect(component.deleteEntry).toHaveBeenCalled();
  });
});
