import { IResult } from '../reporter/result';
import { ResultStatus } from '../reporter/resultStatus';

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

  /** ??? */
  public pending: number = 0;

  /** ??? */
  public ambiguous: number = 0;

  /** The total number of steps that were skipped */
  public skipped: number = 0;

  // Catch all for if we haven't mapped a cucumber report status
  public unknown: number = 0;
  public totalDuration: number = 0;

  public scenarioName: string;

  constructor() {
    this.scenarioName = '';
  }

  /** All steps in the scenario */
  get total(): number {
    return this.passed + this.failed + this.undefined +
      this.pending + this.ambiguous + this.unknown;
  }

  /** Whether the Scenario has failed due to a failed step */
  get isFailed(): boolean { return this.failed > 0; }

  /** Whether the Scenario has passed due to all steps passing */
  get isPassed(): boolean { return this.passed === this.total; }

  /** Whether the entire scenario is undefined */
  get isUndefined(): boolean { return this.undefined === this.total; }

  /**
   * Updates the summary based on the raw cucumber report step status.
   * Performs the base level summarisation of the report at the lowest leaf
   * of the report tree (the Step)
   * @param result The Step result from the raw Cucumber report
   */
  public aggregateStep(result: IResult): void {
    this.totalDuration += (isNaN(result.duration) ? 0 : result.duration);

    // Switch case on status
    switch (result.status) {
      case ResultStatus.passed: this.passed++; break;
      case ResultStatus.failed: this.failed++; break;
      case ResultStatus.undefined: this.undefined++; break;
      case ResultStatus.pending: this.pending++; break;
      case ResultStatus.ambiguous: this.ambiguous++; break;
      case ResultStatus.skipped: this.skipped++; break;
      default: {
        this.unknown++;
        console.warn(`Unmapped result status for ${result.status}`);
      }
    }
  }
}
