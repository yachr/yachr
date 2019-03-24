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

export interface IResult {
  status: string
  duration: number
  error_message: string
}
