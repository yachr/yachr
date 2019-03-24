import { IResult } from './result';
import { ResultStatus } from './resultStatus';

/**
 * The Cucumber Report Summary maintains a summary of all child
 * elements in a cucumber report.
 * - For a suite of features, this summary is the number of passing/failing
 * features that belong to the suite.
 * - For a single Feature, this summary is the number of passing/failing
 * scenarios that belong to the feature.
 * - For a single Scenario, this summary is the number of passing/failing
 * steps that belong to the scenario
 */
export class CucumberReportSummary {
  public passed: number = 0;
  public failed: number = 0;
  public undefined: number = 0;
  public pending: number = 0;
  public ambiguous: number = 0;

  // Catch all for if we haven't mapped a cucumber report status
  public unknown: number = 0;
  public totalDuration: number = 0;

  public scenarioName: string;

  constructor() {
    this.scenarioName = '';
  }

  /** All features */
  get total(): number {
    return this.passed + this.failed + this.undefined +
      this.pending + this.ambiguous + this.unknown;
  }

  get isFailed(): boolean { return this.failed > 0; }
  get isPassed(): boolean { return this.passed === this.total; }

  /**
   * Updates this summary to include the results of the child summary.
   * The child summary is rolled up into this parent summary
   * @param child The Cucumber Report summary for the sub-element
   *  (Feature in a Suite, Scenario in a single Feature, Step in a single Scenario)
   */
  public aggregateChildSummary(child: CucumberReportSummary): void {
    this.totalDuration += child.totalDuration;

    this.passed += child.passed;
    this.failed += child.failed;
    this.undefined += child.undefined;
    this.pending += child.pending;
    this.ambiguous += child.ambiguous;

    this.unknown += child.unknown;
  }

  /**
   * Updates the summary based on the raw cucumber report step status.
   * Performs the base level summarisation of the report at the lowest leaf
   * of the report tree (the Step)
   * @param result The Step result from the raw Cucumber report
   */
  public updateFromReportResult(result: IResult): void {
    this.totalDuration += (isNaN(result.duration) ? 0 : result.duration);

    // Switch case on status
    switch (result.status) {
      case ResultStatus.passed: this.passed++; break;
      case ResultStatus.failed: this.failed++; break;
      case ResultStatus.undefined: this.undefined++; break;
      case ResultStatus.pending: this.pending++; break;
      case ResultStatus.ambiguous: this.ambiguous++; break;
      default: {
        this.unknown++;
        console.warn(`Unmapped result status for ${result.status}`);
      }
    }
  }
}
