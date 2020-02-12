import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntriesComponent } from './entries/entries.component';
import { EntryComponent } from './entry/entry.component';


const routes: Routes = [
  {path: '', component: EntriesComponent},
  {path: 'entries/:entryId', component: EntryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
