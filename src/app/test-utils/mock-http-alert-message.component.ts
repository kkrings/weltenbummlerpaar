/**
 * Mock HTTP alert message component
 * @packageDocumentation
 */

import { Component, Input } from '@angular/core';

import { AlertType } from '../http-alert/alert.model';

/**
 * Mock HTTP alert message component
 */
@Component({
  selector: 'app-http-alert-message',
  template: '',
})
export class MockHttpAlertMessageComponent {
  /**
   * Mock input HTTP alert type
   */
  @Input() alertType = AlertType.none;
}
