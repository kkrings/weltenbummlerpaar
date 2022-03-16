import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NEVER, of, Subscription, throwError } from 'rxjs';

import { AlertType } from '../../http-alert/alert.model';
import {
  asyncData,
  MockHttpAlertMessageComponent,
  TestUtilsModule,
} from '../../test-utils/test-utils.module';
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
      imports: [
        ReactiveFormsModule,
        FontAwesomeModule,
        NgbTypeaheadModule,
        TestUtilsModule,
      ],
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

  describe('#onSubmit', () => {
    const searchTag = 'some search tag';

    beforeEach(() => {
      component.searchForm.setValue({ searchTag });
    });

    describe('#searchTags$', () => {
      let onSearchTags: Subscription;

      beforeEach(() => {
        onSearchTags = Subscription.EMPTY;
      });

      it('should contain search tag', (done) => {
        onSearchTags = component.searchTags$.subscribe((tags) => {
          expect(tags).toContain(searchTag);
          done();
        }, fail);

        component.onSubmit();
      });

      afterEach(() => {
        onSearchTags.unsubscribe();
      });
    });

    describe('#searchTags and #searchForm', () => {
      beforeEach(() => {
        component.onSubmit();
      });

      it('#searchTags should contain search tag', () => {
        expect(component.searchTags).toContain(searchTag);
      });

      it('#searchForm should have been reset', () => {
        expect(component.searchForm.value).toEqual({ searchTag: '' });
      });
    });
  });

  describe('#deselect', () => {
    const searchTag = 'some search tag';

    beforeEach(() => {
      component.searchTags.push(searchTag);
    });

    describe('#searchTags$', () => {
      let onSearchTags: Subscription;

      beforeEach(() => {
        onSearchTags = Subscription.EMPTY;
      });

      it('should not contain search tag', (done) => {
        onSearchTags = component.searchTags$.subscribe((tags) => {
          expect(tags).not.toContain(searchTag);
          done();
        }, fail);

        component.deselect(searchTag);
      });

      afterEach(() => {
        onSearchTags.unsubscribe();
      });
    });

    describe('#searchTags', () => {
      beforeEach(() => {
        component.deselect(searchTag);
      });

      it('#searchTags should not contain search tag', () => {
        expect(component.searchTags).not.toContain(searchTag);
      });
    });
  });

  it('spinner should not be visible', () => {
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner.classes.invisible).toBeTrue();
  });

  it('spinner should be visible', () => {
    component.searching = true;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner.classes.invisible).toBeUndefined();
  });

  it('search button should be disabled', () => {
    const button = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('search button schould be enabled', () => {
    component.searchForm.setValue({ searchTag: 'some search tag' });
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(button.nativeElement.disabled).toBeFalse();
  });

  it('alert message should not have been rendered', () => {
    const alert = fixture.debugElement.query(
      By.directive(MockHttpAlertMessageComponent)
    );
    expect(alert).toBeNull();
  });

  it('alert message should have been rendered', () => {
    component.httpAlert.alertType = AlertType.server;
    fixture.detectChanges();
    const alert = fixture.debugElement.query(
      By.directive(MockHttpAlertMessageComponent)
    );
    expect(alert).not.toBeNull();
  });

  it('selected search tags should not have been rendered', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.btn-secondary'));
    expect(buttons.length).toEqual(0);
  });

  it('selected search tags should have been rendered', () => {
    const searchTags = ['some search tag', 'some other search tag'];
    component.searchTags.push(...searchTags);
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('.btn-secondary'));
    expect(buttons.length).toEqual(searchTags.length);
  });

  it('#deselect should have been called', () => {
    spyOn(component, 'deselect');
    const searchTag = 'some search tag';
    component.searchTags.push(searchTag);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.btn-secondary'));
    button.triggerEventHandler('click', null);
    expect(component.deselect).toHaveBeenCalledOnceWith(searchTag);
  });
});
