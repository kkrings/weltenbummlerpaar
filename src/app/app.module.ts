import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryGridComponent } from './entry-grid/entry-grid.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import { ImageCarouselComponent } from './entry-detail/image-carousel/image-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryGridComponent,
    EntryDetailComponent,
    ImageCarouselComponent
  ],
  imports: [
    BrowserModule,
    // HttpClientModule,
    AppRoutingModule,
    NgbCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
