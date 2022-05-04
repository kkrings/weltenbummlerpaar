/**
 * Parsed date range model
 * @packageDocumentation
 */

import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

/**
 * Parsed date range model
 *
 * This model is used by the components that handle the user's date range input.
 */
export interface NgbDateRange {
  /**
   * Parsed time period's start date
   */
  dateMin: NgbDate | null;

  /**
   * Parsed time period's end date
   */
  dateMax: NgbDate | null;
}
