/**
 * Unit tests for diary entry search form component
 * @packageDocumentation
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchTagSearchComponent } from '../../../search-tag/search-tag-search/search-tag-search.component';
import {
  MockSearchTagSearchComponent,
  TestUtilsModule,
} from '../../../test-utils/test-utils.module';
import { DiaryEntrySearchService } from '../diary-entry-search.service';
import { DiaryEntrySearchFormComponent } from './diary-entry-search-form.component';

describe('DiaryEntrySearchFormComponent', () => {
  let component: DiaryEntrySearchFormComponent;
  let fixture: ComponentFixture<DiaryEntrySearchFormComponent>;
  let formControl: MockSearchTagSearchComponent;

  beforeEach(async () => {
    const diaryEntrySearchServiceSpy = jasmine.createSpyObj(
      'DiaryEntrySearchService',
      ['subscribeToSearchTags', 'unsubscribeFromSearchTags']
    );

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TestUtilsModule],
      declarations: [DiaryEntrySearchFormComponent],
      providers: [
        {
          provide: DiaryEntrySearchService,
          useValue: diaryEntrySearchServiceSpy,
        },
      ],
    }).compileComponents();

    formControl = TestBed.inject(
      SearchTagSearchComponent
    ) as unknown as MockSearchTagSearchComponent;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntrySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    const service = TestBed.inject(
      DiaryEntrySearchService
    ) as jasmine.SpyObj<DiaryEntrySearchService>;

    expect(service.subscribeToSearchTags).toHaveBeenCalledOnceWith(
      component.diaryEntrySearchTags.valueChanges
    );
  });

  it('#diaryEntrySearchForm is untouched', () => {
    expect(component.diaryEntrySearchForm.untouched).toBeTrue();
  });

  it('#diaryEntrySearchTags.value is empty', () => {
    expect(component.diaryEntrySearchTags.value).toEqual([]);
  });

  it('#diaryEntrySearchForm is touched', () => {
    formControl.searchTagsSource.next([]);
    expect(component.diaryEntrySearchForm.touched).toBeTrue();
  });

  it('#diaryEntrySearchTags.value is changed', () => {
    const searchTags = ['Some search tag', 'Some other search tag'];
    formControl.searchTagsSource.next(searchTags.slice(0, 1));
    formControl.searchTagsSource.next(searchTags);
    expect(component.diaryEntrySearchTags.value).toEqual(searchTags);
  });

  it('search tags are set', () => {
    const searchTags = ['Some search tag'];
    component.diaryEntrySearchTags.setValue(searchTags);
    expect(formControl.searchTags).toEqual(searchTags);
  });

  afterEach(() => {
    const service = TestBed.inject(
      DiaryEntrySearchService
    ) as jasmine.SpyObj<DiaryEntrySearchService>;

    component.ngOnDestroy();
    expect(service.unsubscribeFromSearchTags).toHaveBeenCalled();
  });
});
