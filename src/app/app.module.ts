/**
 * Application's root module
 * @packageDocumentation
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbAlertModule,
  NgbCarouselModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthModalComponent } from './auth/auth-modal/auth-modal.component';
import { AuthDirective } from './auth/auth.directive';
import { DiaryEntryFormComponent } from './diary-entry/diary-entry-form/diary-entry-form.component';
import { DateRangeInputComponent } from './date-range/date-range-input/date-range-input.component';
import { DateRangeSelectComponent } from './date-range/date-range-select/date-range-select.component';
import { DateRangeSelectDayComponent } from './date-range/date-range-select-day/date-range-select-day.component';
import { DateRangeValueAccessorDirective } from './date-range/date-range-value-accessor.directive';
import { DiaryEntrySearchFormComponent } from './diary-entry/diary-entry-search/diary-entry-search-form/diary-entry-search-form.component';
import { DiaryEntryLoadMoreComponent } from './diary-entry/diary-entry-search/diary-entry-load-more/diary-entry-load-more.component';
import { DiaryEntryGridComponent } from './diary-entry/diary-entry-grid/diary-entry-grid.component';
import { DiaryEntryCardComponent } from './diary-entry/diary-entry-card/diary-entry-card.component';
import { DiaryEntryModalComponent } from './diary-entry/diary-entry-modal/diary-entry-modal.component';
import { DiaryEntryBriefPipe } from './diary-entry/diary-entry-brief.pipe';
import { ImageWithLoaderComponent } from './image/image-with-loader/image-with-loader.component';
import { ImageCarouselComponent } from './image/image-carousel/image-carousel.component';
import { ImageModalComponent } from './image/image-modal/image-modal.component';
import { ImageUploadComponent } from './image/image-upload/image-upload.component';
import { ImageDirective } from './image/image.directive';
import { SearchTagSearchComponent } from './search-tag/search-tag-search/search-tag-search.component';
import { SearchTagSearchAccessorDirective } from './search-tag/search-tag-search-accessor.directive';
import { FileValueAccessorDirective } from './shared/file-value-accessor.directive';
import { HttpAlertMessageComponent } from './http-alert/http-alert-message/http-alert-message.component';

/**
 * Application's root module
 *
 * Configure declarations (e.g. components), imports, and providers.
 */
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthModalComponent,
    AuthDirective,
    DiaryEntryFormComponent,
    DateRangeInputComponent,
    DateRangeSelectComponent,
    DateRangeSelectDayComponent,
    DateRangeValueAccessorDirective,
    DiaryEntrySearchFormComponent,
    DiaryEntryLoadMoreComponent,
    DiaryEntryGridComponent,
    DiaryEntryCardComponent,
    DiaryEntryModalComponent,
    DiaryEntryBriefPipe,
    ImageWithLoaderComponent,
    ImageCarouselComponent,
    ImageModalComponent,
    ImageUploadComponent,
    ImageDirective,
    SearchTagSearchComponent,
    SearchTagSearchAccessorDirective,
    FileValueAccessorDirective,
    HttpAlertMessageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('JWT'),
        allowedDomains: [environment.domain],
        disallowedRoutes: [`${environment.baseurl}/rest/auth/login`],
      },
    }),
    ReactiveFormsModule,
    NgbAlertModule,
    NgbCarouselModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbTypeaheadModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
