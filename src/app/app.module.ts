import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import localeDe from '@angular/common/locales/de';

import { HttpClientModule } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { EntryGridComponent } from './entry-grid/entry-grid.component';
import { EntryCardComponent } from './entry-card/entry-card.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';

import { EntryService } from './shared/entry.service';
import { ImageService } from './shared/image.service';


registerLocaleData(localeDe);


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SpinnerComponent,
    EntryGridComponent,
    EntryCardComponent,
    ImageCarouselComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de' },
    EntryService,
    ImageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
