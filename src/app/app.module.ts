/**
 * Application's root module
 * @packageDocumentation
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  NgbAlertModule,
  NgbCarouselModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';

import localeDe from '@angular/common/locales/de';

import { AppComponent } from './app.component';

import {
  DiaryEntryGridComponent
} from './diary-entry-grid/diary-entry-grid.component';

import {
  DiaryEntryCardComponent
} from './diary-entry-card/diary-entry-card.component';

import {
  DiaryEntryModalComponent
} from './diary-entry-modal/diary-entry-modal.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';


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
    DiaryEntryGridComponent,
    DiaryEntryCardComponent,
    DiaryEntryModalComponent,
    ImageCarouselComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
