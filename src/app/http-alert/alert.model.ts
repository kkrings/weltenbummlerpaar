/**
 * HTTP alert model
 * @packageDocumentation
 */

/**
 * HTTP alert model
 */
export class Alert {
  /**
   * Initialize a HTTP alert
   *
   * @param alertType
   *   HTTP alert type, which corresponds to a user-friendly alert message
   */
  constructor(public alertType: AlertType = AlertType.none) { }

  /**
   * If `true`, an alert message is shown if `alertType` is passed to the HTTP
   * alert message component.
   */
  get isShown(): boolean {
    return this.alertType !== AlertType.none;
  };
}

/**
 * HTTP alert message types
 */
export enum AlertType {
  /**
   * Everything is fine.
   */
  none = 'none',
  /**
   * Communication with the back-end server is not possible, because something
   * is wrong on the client side.
   */
  client = 'client-side error',
  /**
   * Communication with the back-end server is not possible, because something
   * is wrong on the server side.
   */
  server = 'server-side error',
  /**
   * The back-end server has responded with a permission denied message.
   */
  permission = 'permission denied'
}
