import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryGridComponent } from './entry-grid/entry-grid.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';


const routes: Routes = [
  {path: '', component: EntryGridComponent},
  {path: 'entries/:entryId', component: EntryDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
