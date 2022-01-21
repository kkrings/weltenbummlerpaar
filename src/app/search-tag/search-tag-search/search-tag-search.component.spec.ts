import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NEVER, of, Subscription, throwError } from 'rxjs';

import { AlertType } from '../../http-alert/alert.model';
import { asyncData } from '../../test-utils/test-utils.module';
import { SearchTagSearchConfig } from '../search-tag-search-config.service';
import { SearchTagService } from '../search-tag.service';
import { SearchTagSearchComponent } from './search-tag-search.component';

describe('SearchTagSearchComponent', () => {
  let component: SearchTagSearchComponent;
  let fixture: ComponentFixture<SearchTagSearchComponent>;

  beforeEach(async () => {
    const searchTagSearchConfig: SearchTagSearchConfig = { waitForNumMs: 0 };

    const searchTagServiceSpy = jasmine.createSpyObj('SearchTagService', [
      'find',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FontAwesomeModule, NgbTypeaheadModule],
      declarations: [SearchTagSearchComponent],
      providers: [
        {
          provide: SearchTagSearchConfig,
          useValue: searchTagSearchConfig,
        },
        {
          provide: SearchTagService,
          useValue: searchTagServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTagSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('on search tags', () => {
    let onSearch: Subscription;

    beforeEach(() => {
      onSearch = Subscription.EMPTY;
    });

    it('#search should search for search tags', (done) => {
      const searchString = 'Some';
      const searchTags = ['Some search tag'];

      const searchTagServiceSpy = TestBed.inject(
        SearchTagService
      ) as jasmine.SpyObj<SearchTagService>;

      searchTagServiceSpy.find.and.returnValue(of(searchTags));

      onSearch = component.search(of(searchString)).subscribe((tags) => {
        expect(searchTagServiceSpy.find).toHaveBeenCalledWith(searchString);
        expect(tags).toEqual(searchTags);
        done();
      }, fail);
    });

    it('#search should set alert type', (done) => {
      const searchString = 'Some';

      const searchTagServiceSpy = TestBed.inject(
        SearchTagService
      ) as jasmine.SpyObj<SearchTagService>;

      searchTagServiceSpy.find.and.returnValue(throwError(AlertType.server));

      onSearch = component.search(of(searchString)).subscribe((tags) => {
        expect(searchTagServiceSpy.find).toHaveBeenCalledWith(searchString);
        expect(tags.length).toEqual(0);
        expect(component.httpAlert.alertType).toEqual(AlertType.server);
        done();
      }, fail);
    });

    it('#search should remove already selected search tags', (done) => {
      const selectedSearchTag = 'Some search tag';

      const searchTagServiceSpy = TestBed.inject(
        SearchTagService
      ) as jasmine.SpyObj<SearchTagService>;

      searchTagServiceSpy.find.and.returnValue(
        of([selectedSearchTag, 'Some other search tag'])
      );

      component.searchTags.push(selectedSearchTag);

      onSearch = component.search(of('Some')).subscribe((tags) => {
        expect(tags).not.toContain(selectedSearchTag);
        done();
      }, fail);
    });

    afterEach(() => {
      onSearch.unsubscribe();
    });
  });

  describe('on focus', () => {
    let onSearch: Subscription;

    beforeEach(() => {
      onSearch = Subscription.EMPTY;
    });

    it('#search should search for search tags', (done) => {
      const searchString = 'Some';
      const searchTags = ['Some search tag'];

      const searchTagServiceSpy = TestBed.inject(
        SearchTagService
      ) as jasmine.SpyObj<SearchTagService>;

      searchTagServiceSpy.find.and.returnValue(of(searchTags));

      onSearch = component.search(NEVER).subscribe((tags) => {
        expect(searchTagServiceSpy.find).toHaveBeenCalledWith(searchString);
        expect(tags).toEqual(searchTags);
        done();
      }, fail);

      component.onFocus(searchString);
    });

    afterEach(() => {
      onSearch.unsubscribe();
    });
  });

  it('#onFocus should have been called', () => {
    spyOn(component, 'onFocus');
    const searchTagInput = fixture.debugElement.query(By.css('#search-tag'));
    searchTagInput.nativeElement.dispatchEvent(new Event('focus'));
    expect(component.onFocus).toHaveBeenCalledOnceWith('');
  });

  it(
    '#search should toggle #searching',
    waitForAsync(() => {
      const searchTagServiceSpy = TestBed.inject(
        SearchTagService
      ) as jasmine.SpyObj<SearchTagService>;

      searchTagServiceSpy.find.and.returnValue(asyncData(['Some search tag']));

      const searchTagInput = fixture.debugElement.query(By.css('#search-tag'));
      searchTagInput.nativeElement.value = 'Some';
      searchTagInput.nativeElement.dispatchEvent(new Event('input'));

      expect(component.searching).toBeTrue();

      fixture.whenStable().then(() => {
        expect(component.searching).toBeFalse();
      });
    })
  );

  it(
    '#search should resert alert type',
    waitForAsync(() => {
      component.httpAlert.alertType = AlertType.server;

      const searchTagServiceSpy = TestBed.inject(
        SearchTagService
      ) as jasmine.SpyObj<SearchTagService>;

      searchTagServiceSpy.find.and.returnValue(asyncData(['Some search tag']));

      const searchTagInput = fixture.debugElement.query(By.css('#search-tag'));
      searchTagInput.nativeElement.value = 'Some';
      searchTagInput.nativeElement.dispatchEvent(new Event('input'));

      fixture.whenStable().then(() => {
        expect(component.httpAlert.alertType).toEqual(AlertType.none);
      });
    })
  );
});
