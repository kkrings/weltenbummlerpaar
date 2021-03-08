/**
 * Test utilities module
 * @packageDocumentation
 */

import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertType } from '../http-alert/alert.model';


/**
 * Mock HTTP alert message component
 */
@Component({
  selector: 'app-http-alert-message',
  template: ''
})
export class MockHttpAlertMessageComponent {
  /**
   * Mock input HTTP alert type
   */
  @Input() alertType = AlertType.none;
}


/**
 * Test utilities module
 *
 * This module provides mock implementations of components, directives,
 * services, and so on that are used in more than one unit test file.
 */
@NgModule({
  declarations: [
    MockHttpAlertMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MockHttpAlertMessageComponent
  ]
})
export class TestUtilsModule { }
