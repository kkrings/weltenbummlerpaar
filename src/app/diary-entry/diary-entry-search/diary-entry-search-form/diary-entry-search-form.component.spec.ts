/**
 * Unit tests for diary entry search form component
 * @packageDocumentation
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';

import { DiaryEntrySearchFormComponent } from './diary-entry-search-form.component';
import { DiaryEntrySearchService } from '../diary-entry-search.service';
import { SearchTagSearchAccessorDirective } from '../../../search-tag/search-tag-search-accessor.directive';
import { SearchTagSearchComponent } from 'src/app/search-tag/search-tag-search/search-tag-search.component';

@Component({
  selector: 'app-search-tag-search',
})
class MockSearchTagSearchComponent {
  searchTags$: Observable<string[]>;
  searchTagsSource = new Subject<string[]>();

  constructor() {
    this.searchTags$ = this.searchTagsSource.asObservable();
  }
}

describe('DiaryEntrySearchFormComponent', () => {
  let component: DiaryEntrySearchFormComponent;
  let fixture: ComponentFixture<DiaryEntrySearchFormComponent>;
  let formControl: MockSearchTagSearchComponent;

  beforeEach(async () => {
    formControl = new MockSearchTagSearchComponent();

    const diaryEntrySearchServiceSpy = jasmine.createSpyObj(
      'DiaryEntrySearchService',
      ['subscribeToSearchTags', 'unsubscribeFromSearchTags']
    );

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        DiaryEntrySearchFormComponent,
        SearchTagSearchAccessorDirective,
        MockSearchTagSearchComponent,
      ],
      providers: [
        {
          provide: DiaryEntrySearchService,
          useValue: diaryEntrySearchServiceSpy,
        },
        {
          provide: SearchTagSearchComponent,
          useValue: formControl,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntrySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('on initialization, diary entry search service should subscribe to search tags form', () => {
    const service = TestBed.inject(
      DiaryEntrySearchService
    ) as jasmine.SpyObj<DiaryEntrySearchService>;
    expect(service.subscribeToSearchTags).toHaveBeenCalledOnceWith(
      component.diaryEntrySearchTags.valueChanges
    );
  });

  it('on destroy, diary entry search service should unsubscribe from search tags form', () => {
    const service = TestBed.inject(
      DiaryEntrySearchService
    ) as jasmine.SpyObj<DiaryEntrySearchService>;
    component.ngOnDestroy();
    expect(service.unsubscribeFromSearchTags).toHaveBeenCalled();
  });
});
