import { ScenarioSummary } from './scenarioSummary';
/**
 * A summary of all scenarios in a Feature
 */
export class FeatureSummary {

  /** The total number of features that have passed */
  public passed: number = 0;

  /** The total number of features that have failed */
  public failed: number = 0;

  /** The total number of features that are not implemented (and thus marked as undefined) */
  public undefined: number = 0;

  // TODO: Remove this if not required. Only used for initial testing
  /** Keeps track of other non-mapped statuses */
  public other: number = 0;

  /** All features in this group  */
  get total(): number {
    return this.passed + this.failed + this.undefined;
  }

  /** Whether the Suite or Feature has failed due to a failed Feature or Scenario */
  get isFailed(): boolean { return this.failed > 0; }

  /** Whether the Suite or Feature has passed due to all steps passing */
  get isPassed(): boolean { return this.passed === this.total; }

  /** Whether the entire Suite or Feature is undefined */
  get isUndefined(): boolean { return this.undefined === this.total; }

  /** Updates the aggregated summary using information gathered in the Element Summary */
  public aggregateScenario(scenario: ScenarioSummary): void {
    if (scenario.isFailed) { this.failed++; }
    else if (scenario.isPassed) { this.passed++; }
    else if (scenario.isUndefined) { this.undefined++; }
    else {
      console.warn('Unmapped value for scenario ', scenario);
      this.other++;
    }

  }

}
