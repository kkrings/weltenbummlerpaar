/**
 * Routing module
 * @packageDocumentation
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryGridComponent } from './entry-grid/entry-grid.component';


/**
 * Configured routes
 */
const routes: Routes = [
  {path: '', component: EntryGridComponent},
];

/**
 * Routing module
 *
 * Pass configured routes to routing module.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
