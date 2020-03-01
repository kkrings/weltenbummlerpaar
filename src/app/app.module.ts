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
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EntryGridComponent } from './entry-grid/entry-grid.component';
import { EntryCardComponent } from './entry-card/entry-card.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';

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
    EntryCardComponent,
    SpinnerComponent,
    AlertComponent,
    ImageCarouselComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de' },
    EntryService,
    ImageService,
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
