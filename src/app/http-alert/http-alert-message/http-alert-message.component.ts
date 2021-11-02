/**
 * HTTP alert message component
 * @packageDocumentation
 */

import { Component, Input } from '@angular/core';

import { AlertType } from '../alert.model';

/**
 * HTTP alert message component
 *
 * This component shows a user-friendly alert message that corresponds to a HTTP error.
 */
@Component({
  selector: 'app-http-alert-message',
  templateUrl: './http-alert-message.component.html',
  styleUrls: ['./http-alert-message.component.scss'],
})
export class HttpAlertMessageComponent {
  /**
   * The shown alert message depends on its type.
   */
  @Input() alertType: AlertType = AlertType.none;

  /**
   * If `true`, the user can dismiss the alert message.
   */
  @Input() alertIsDismissible = false;

  /**
   * An alert message is only shown if this is `true`.
   */
  get showAlert(): boolean {
    return this.alertType !== AlertType.none;
  }

  /**
   * Alert type corresponds to a client-side error.
   */
  get clientSideError(): boolean {
    return this.alertType === AlertType.client;
  }

  /**
   * Alert type corresponds to a server-side error.
   */
  get serverSideError(): boolean {
    return this.alertType === AlertType.server;
  }

  /**
   * Alert type corresponds to a permission-denied error.
   */
  get permissionDenied(): boolean {
    return this.alertType === AlertType.permission;
  }
}
