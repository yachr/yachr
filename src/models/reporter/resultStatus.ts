/**
 * Lists the possible result statuses for a step result in the Cucumber
 * report
 */
export enum ResultStatus {
  passed = 'passed',
  failed = 'failed',
  undefined = 'undefined',
  pending = 'pending',
  ambiguous = 'ambiguous',

  /**
   * Skipped can occur in a Cucumber Test Report
   * when a preceeding step fails
   */
  skipped = 'skipped'
}
