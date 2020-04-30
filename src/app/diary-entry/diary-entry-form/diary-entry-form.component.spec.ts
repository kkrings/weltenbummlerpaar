/**
 * Unit tests for diary entry form component
 * @packageDocumentation
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DiaryEntryFormComponent } from './diary-entry-form.component';
import { DiaryEntryService } from '../diary-entry.service';


/**
 * Mock active modal
 */
class MockNgbActiveModal {
  /**
   * Mock the close the active modal's close method.
   */
  close(): void { }
}


describe('DiaryEntryFormComponent', () => {
  let component: DiaryEntryFormComponent;
  let fixture: ComponentFixture<DiaryEntryFormComponent>;

  beforeEach(async(() => {
    const diaryEntryServiceSpy = jasmine.createSpyObj(
      'DiaryEntryService', ['saveEntry', 'updateEntry']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        DiaryEntryFormComponent
      ],
      providers: [
        {provide: DiaryEntryService, useValue: diaryEntryServiceSpy},
        {provide: NgbActiveModal, useClass: MockNgbActiveModal}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render injected modal\'s title', () => {
    const testTitle = 'Some title';

    component.modalTitle = testTitle;
    fixture.detectChanges();

    const modalTitle = fixture.debugElement.query(By.css('.modal-title'));
    expect(modalTitle.nativeElement.textContent).toMatch(testTitle);
  });

  it('#closeModal should close modal', () => {
    const modal: NgbActiveModal = TestBed.inject(NgbActiveModal);
    spyOn(modal, 'close');
    component.closeModal();
    expect(modal.close).toHaveBeenCalled();
  });

  it('header\'s dismiss button should trigger #closeModal', () => {
    const closeButton = fixture.debugElement.query(
        By.css('.modal-header button.close'));

    spyOn(component, 'closeModal');
    closeButton.triggerEventHandler('click', null);
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('footer\'s abort button should trigger #closeModal', () => {
    const abortButton = fixture.debugElement.query(
        By.css('.modal-footer button.btn.btn-danger'));

    spyOn(component, 'closeModal');
    abortButton.triggerEventHandler('click', null);
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('#title.value should match entered title', () => {
    const testTitle = 'Some title';

    const titleInput = fixture.debugElement.query(By.css('#title'));
    titleInput.nativeElement.value = testTitle;
    titleInput.nativeElement.dispatchEvent(new Event('input'));

    expect(component.title.value).toMatch(testTitle);
  });

  it('should not render title\'s validation error after init', () => {
    const errorMessage = fixture.debugElement.query(By.css('#title + div'));
    expect(errorMessage).toBeNull();
  });

  it('#location.value should match location entered by user', () => {
    const testLocation = 'Some location';

    const locationInput = fixture.debugElement.query(By.css('#location'));
    locationInput.nativeElement.value = testLocation;
    locationInput.nativeElement.dispatchEvent(new Event('input'));

    expect(component.locationName.value).toMatch(testLocation);
  });

  it('should not render location\'s validation error after init', () => {
    const errorMessage = fixture.debugElement.query(By.css('#location + div'));
    expect(errorMessage).toBeNull();
  });

  it('#body.value should match body entered by user', () => {
    const testBody = 'Some body';

    const bodyInput = fixture.debugElement.query(By.css('#body'));
    bodyInput.nativeElement.value = testBody;
    bodyInput.nativeElement.dispatchEvent(new Event('input'));

    expect(component.body.value).toMatch(testBody);
  });

  it('should not render body\'s validation error after init', () => {
    const errorMessage = fixture.debugElement.query(By.css('#body + div'));
    expect(errorMessage).toBeNull();
  });

  it('#tags.value should match tags entered by user', () => {
    const testTags = 'Some tag, some other tag';

    const tagsInput = fixture.debugElement.query(By.css('#tags'));
    tagsInput.nativeElement.value = testTags;
    tagsInput.nativeElement.dispatchEvent(new Event('input'));

    expect(component.tags.value).toMatch(testTags);
  });
});
