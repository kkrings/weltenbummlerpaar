import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
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
    AppRoutingModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
  ],
  providers: [
    EntryService,
    ImageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
