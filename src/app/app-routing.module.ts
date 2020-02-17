import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryGridComponent } from './entry-grid/entry-grid.component';
import { EntryCardComponent } from './entry-card/entry-card.component';


const routes: Routes = [
  {path: '', component: EntryGridComponent},
  {path: 'entries/:entryId', component: EntryCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
