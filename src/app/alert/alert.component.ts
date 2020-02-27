/**
 * Alert component
 * @packageDocumentation
 */

import { Component, OnInit, Input } from '@angular/core';


/**
 * Present an alert message to the user in case of a failed HTTP request.
 */
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  /**
   * Alert message
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
