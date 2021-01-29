/**
 * Alert message model
 * @packageDocumentation
 */

/**
 * Alert message
 */
export interface Alert {
  /**
   * The actual alert message
   */
  readonly message: string;
  /**
   * The alert message's type
   */
  readonly alertType: AlertType;
}

/**
 * Alert message types
 */
export enum AlertType {
  /**
   * Everything is fine.
   */
  none = 'none',
  /**
   * Something bad has happened; e.g. the back-end server is down.
   */
  danger = 'danger',
  /**
   * Let the user know about things like failed searches for diary entries.
   */
  warning = 'warning'
}

/**
 * Create an alert message of type danger.
 *
 * @param message
 *   Alert message
 *
 * @returns
 *   Alert message of type danger
 */
export const shoutDanger = (message: string): Alert => ({
  message,
  alertType: AlertType.danger
});

/**
 * Create an alert message of type warning.
 *
 * @param message
 *   Alert message
 *
 * @returns
 *   Alert message of type warning
 */
export const shoutWarning = (message: string): Alert => ({
  message,
  alertType: AlertType.warning
});

/**
 * Helper constant for initializing alert messages in components
 */
export const NOALERT: Alert = {
  message: '',
  alertType: AlertType.none
};
