/**
 * Application's root module
 * @packageDocumentation
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';

import {
  NgbAlertModule,
  NgbCarouselModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import {
  AuthModalComponent
} from './auth/auth-modal/auth-modal.component';

import { AuthDirective } from './auth/auth.directive';

import {
  DiaryEntryFormComponent
} from './diary-entry/diary-entry-form/diary-entry-form.component';

import {
  DiaryEntryGridComponent
} from './diary-entry/diary-entry-grid/diary-entry-grid.component';

import {
  DiaryEntryCardComponent
} from './diary-entry/diary-entry-card/diary-entry-card.component';

import {
  DiaryEntryModalComponent
} from './diary-entry/diary-entry-modal/diary-entry-modal.component';

import {
  ImageCarouselComponent
} from './image/image-carousel/image-carousel.component';


// application expects German-speaking users
registerLocaleData(localeDe);


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
    DiaryEntryGridComponent,
    DiaryEntryCardComponent,
    DiaryEntryModalComponent,
    ImageCarouselComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('JWT'),
        whitelistedDomains: [environment.domain],
        blacklistedRoutes: [`${environment.domain}/db/admins/login`]
      }
    }),
    ReactiveFormsModule,
    NgbAlertModule,
    NgbCarouselModule,
    NgbModalModule
  ],
  providers: [
    // application's default language is German
    {provide: LOCALE_ID, useValue: 'de'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
