/**
 * Application's root module
 * @packageDocumentation
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbCarouselModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthModalComponent } from './auth/auth-modal/auth-modal.component';
import { AuthDirective } from './auth/auth.directive';
import { DiaryEntryFormComponent } from './diary-entry/diary-entry-form/diary-entry-form.component';

import {
  DiaryEntrySearchFormComponent
} from './diary-entry/diary-entry-search/diary-entry-search-form/diary-entry-search-form.component';

import { DiaryEntryGridComponent } from './diary-entry/diary-entry-grid/diary-entry-grid.component';
import { DiaryEntryCardComponent } from './diary-entry/diary-entry-card/diary-entry-card.component';
import { DiaryEntryModalComponent } from './diary-entry/diary-entry-modal/diary-entry-modal.component';
import { DiaryEntryBriefPipe } from './diary-entry/diary-entry-brief.pipe';
import { ImageCarouselComponent } from './image/image-carousel/image-carousel.component';
import { ImageModalComponent } from './image/image-modal/image-modal.component';
import { ImageUploadComponent } from './image/image-upload/image-upload.component';
import { ImageDirective } from './image/image.directive';
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
    DiaryEntrySearchFormComponent,
    DiaryEntryGridComponent,
    DiaryEntryCardComponent,
    DiaryEntryModalComponent,
    DiaryEntryBriefPipe,
    ImageCarouselComponent,
    ImageModalComponent,
    ImageUploadComponent,
    ImageDirective,
    FileValueAccessorDirective,
    HttpAlertMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('JWT'),
        allowedDomains: [environment.domain],
        disallowedRoutes: [`${environment.domain}/db/admins/login`]
      }
    }),
    ReactiveFormsModule,
    NgbAlertModule,
    NgbCarouselModule,
    NgbModalModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
