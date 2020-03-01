/**
 * Loading spinner component
 * @packageDocumentation
 */

import { Component, OnInit, Input } from '@angular/core';


/**
 * Loading spinner component
 *
 * Show a loading spinner when retrieving data from the back-end server.
 */
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  /**
   * Controls if loading spinner is shown.
   */
  @Input() showSpinner = false;

  /**
   * Construct loading spinner component.
   */
  constructor() { }

  /**
   * Initialize loading spinner component.
   */
  ngOnInit() {
  }
}
