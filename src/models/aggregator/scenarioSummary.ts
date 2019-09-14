import { IResult } from '../reporter/result';
import { ResultStatus } from '../reporter/resultStatus';
import { IStep } from '../reporter/step';

/**
 * A summary of all steps in a Gherkin Scenario as reported by the Cucumber Test Report.
 * Summarises all steps into a single aggregated summary
 */
export class ScenarioSummary {

  // Reports the total number of steps in the Scenario that have passed, failed, etc.

  /** The total number of steps that have passed for this Scenario */
  public passed: number = 0;

  /** The total number of steps that have failed for this Scenario */
  public failed: number = 0;

  /** The total number of steps that are not implemented (and thus marked as undefined) */
  public undefined: number = 0;

  /** The number of step that are not fully implemented and only return pending */
  public pending: number = 0;

  /** The nuber of steps that are ambiguous, preventing the Cucumber Test runner from running the step */
  public ambiguous: number = 0;

  /** The total number of steps that were skipped */
  public skipped: number = 0;

  public steps: IStep[] = [];

  public totalDuration: number = 0;

  public scenarioName: string = '';
  public scenarioDescription: string = '';
  public scenarioKeyword: string = '';

  /** All steps in the scenario */
  get total(): number {
    return this.passed + this.failed + this.undefined +
      this.pending + this.ambiguous + this.skipped;
  }

  /** Whether the Scenario has at least one ambiguously defined step definition */
  get hasAmbiguous(): boolean { return this.ambiguous > 0; }

  /** Whether the Scenario has at least one failed step */
  get hasFailed(): boolean { return this.failed > 0; }

  /** Whether the Scenario has at least one undefined step */
  get hasUndefined(): boolean {
    return this.undefined > 0 ||  // Undefined if we have an undefined step
      this.hasNoSteps;            // Or if we have no steps at all
    }

  /** Whether the Scenario has at least one pending step */
  get hasPending(): boolean { return this.pending > 0; }

  /** Whether the Scenario has passed due to all steps passing */
  get isPassed(): boolean { return this.passed === this.total; }

  get hasNoSteps(): boolean { return this.total === 0; }

  /**
   * Updates the summary based on the raw cucumber report step status.
   * Performs the base level summarisation of the report at the lowest leaf
   * of the report tree (the Step)
   * @param result The Step result from the raw Cucumber report
   * @param hidden Some steps are hidden eg BeforeAll steps. We don't count them in the totals, except for duration
   */
  public aggregateStep(result: IResult, hidden?: boolean): void {
    this.totalDuration += (isNaN(result.duration) ? 0 : result.duration);

    // We don't count the hidden steps, but track their time above
    if (hidden) return;

    // Switch case on status
    switch (result.status) {
      case ResultStatus.passed: this.passed++; break;
      case ResultStatus.failed: this.failed++; break;
      case ResultStatus.undefined: this.undefined++; break;
      case ResultStatus.pending: this.pending++; break;
      case ResultStatus.ambiguous: this.ambiguous++; break;
      case ResultStatus.skipped: this.skipped++; break;
      default: {
        // tslint:disable-next-line: max-line-length
        throw new Error(`Undefined result status for ${result.status}. Please raise a GitHub issue with the Yachr Team`);
      }
    }
  }
}
