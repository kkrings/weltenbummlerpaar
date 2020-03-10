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
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import {
  NavLoginModalComponent
} from './nav-login-modal/nav-login-modal.component';

import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { EntryGridComponent } from './entry-grid/entry-grid.component';
import { EntryModalComponent } from './entry-modal/entry-modal.component';

import {
  EntryImgSliderComponent
} from './entry-img-slider/entry-img-slider.component';

import { SpinnerComponent } from './spinner/spinner.component';
import { HttpAlertComponent } from './http-alert/http-alert.component';

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
    NavBarComponent,
    NavLoginModalComponent,
    JumbotronComponent,
    EntryGridComponent,
    EntryModalComponent,
    EntryImgSliderComponent,
    SpinnerComponent,
    HttpAlertComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AlertModule.forRoot(),
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
    NavLoginModalComponent,
    EntryModalComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
