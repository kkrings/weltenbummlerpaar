/**
 * Root module
 * @packageDocumentation
 */

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import localeDe from '@angular/common/locales/de';

import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EntryGridComponent } from './entry-grid/entry-grid.component';
import { EntryModalComponent } from './entry-modal/entry-modal.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';

import { EntryService } from './shared/entry.service';
import { ImageService } from './shared/image.service';
import { AlertService } from './shared/alert.service';


// application expects german-speaking users
registerLocaleData(localeDe);


/**
 * Root module
 *
 * Configure declarations (e.g. components), imports, and providers (e.g.
 * services).
 */
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EntryGridComponent,
    EntryModalComponent,
    CarouselComponent,
    SpinnerComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de' },
    EntryService,
    ImageService,
    AlertService,
  ],
  entryComponents: [
    EntryModalComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
