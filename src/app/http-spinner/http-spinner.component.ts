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
  selector: 'app-http-spinner',
  templateUrl: './http-spinner.component.html',
  styleUrls: ['./http-spinner.component.scss']
})
export class HttpSpinnerComponent implements OnInit {
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
