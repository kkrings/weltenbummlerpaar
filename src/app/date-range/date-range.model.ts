/**
 * Date range model
 * @packageDocumentation
 */

/**
 * Date range model
 *
 * Describes the time period a diary entry covers.
 */
export interface DateRange {
  /**
   * Time period's start date
   */
  dateMin: string;

  /**
   * Time period's end date
   */
  dateMax: string;
}
