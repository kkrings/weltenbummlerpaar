/**
 * Unit tests for diary entry search form component
 * @packageDocumentation
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DiaryEntrySearchFormComponent } from './diary-entry-search-form.component';
import { DiaryEntrySearchService } from '../diary-entry-search.service';


describe('DiaryEntrySearchFormComponent', () => {
  let component: DiaryEntrySearchFormComponent;
  let fixture: ComponentFixture<DiaryEntrySearchFormComponent>;

  beforeEach(async () => {
    const diaryEntrySearchServiceSpy = jasmine.createSpyObj('DiaryEntrySearchService', [
      'subscribeToSearchTags',
      'unsubscribeFromSearchTags'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FontAwesomeModule
      ],
      declarations: [
        DiaryEntrySearchFormComponent
      ],
      providers: [
        {provide: DiaryEntrySearchService, useValue: diaryEntrySearchServiceSpy}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntrySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('on initialization, diary entry search service should subscribe to search tags form', () => {
    const service = TestBed.inject(DiaryEntrySearchService) as jasmine.SpyObj<DiaryEntrySearchService>;
    expect(service.subscribeToSearchTags).toHaveBeenCalledOnceWith(component.diaryEntrySearchTags.valueChanges);
  });

  it('on destroy, diary entry search service should unsubscribe from search tags form', () => {
    const service = TestBed.inject(DiaryEntrySearchService) as jasmine.SpyObj<DiaryEntrySearchService>;
    component.ngOnDestroy();
    expect(service.unsubscribeFromSearchTags).toHaveBeenCalled();
  });

  it('#diaryEntrySearchTags.value should match entered search tags', () => {
    const searchTags = 'some tag, some other tag';
    const searchTagsInput = fixture.debugElement.query(By.css('#tags'));
    searchTagsInput.nativeElement.value = searchTags;
    searchTagsInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.diaryEntrySearchTags.value).toEqual(searchTags);
  });
});
