/**
 * Lists the possible result statuses for a step result in the Cucumber
 * report
 */
export enum ResultStatus {

  /** The step has passed execution */
  passed = 'passed',

  /** The step has encountered an error or failed an assertion */
  failed = 'failed',

  /** The Gherkin step has no Cucumber implementation */
  undefined = 'undefined',

  /** The Gherkin step has a Cucumber implementation defined, but it is not implemented */
  pending = 'pending',

  /**
   * The Gherkin step has two matching Cucumber step definitions which cannot be distinguished.
   * This prevents the Cucumber Test Runner from running the step.
   */
  ambiguous = 'ambiguous',

  /**
   * Skipped can occur in a Cucumber Test Report
   * when a preceeding step fails
   */
  skipped = 'skipped'
}
