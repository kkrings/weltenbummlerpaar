/**
 * Alert component
 * @packageDocumentation
 */

import { Component, OnInit, Input } from '@angular/core';


/**
 * Alert component
 *
 * Present an alert message to the user in case of a failed HTTP request.
 */
@Component({
  selector: 'app-http-alert',
  templateUrl: './http-alert.component.html',
  styleUrls: ['./http-alert.component.scss']
})
export class HttpAlertComponent implements OnInit {
  /**
   * Input alert message
   */
  @Input() alertMessage: string;

  /**
   * Construct alert component.
   */
  constructor() { }

  /**
   * Initialize alert component.
   */
  ngOnInit() {
  }
}
