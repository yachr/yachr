import { FeatureSummary } from './featureSummary';

/**
 * A high level summary of used for dashboard reporting.
 * Represents a summary of all scenarios from multiple features
 * in the test suite
 */
export class ScenarioSuiteSummary {

  /** The total number of scenarios that have passed from all Features */
  public passed: number = 0;

  /** The total number of scenarios that have failed from all Features */
  public failed: number = 0;

  /** The total number of scenarios that are not implemented from all Features (and thus marked as undefined) */
  public undefined: number = 0;

  // TODO: Remove this if not required. Only used for initial testing
  /** Keeps track of other non-mapped statuses */
  public other: number = 0;

  /** All scenarios in this the entire Cucumber Test Suite  */
  get total(): number {
    return this.passed + this.failed + this.undefined + this.other;
  }

  /** Updates the Scenario Suite Summary using information gathered in the Feature Summary */
  public aggregateFeature(feature: FeatureSummary): void {
    this.passed += feature.passed;
    this.failed += feature.failed;
    this.undefined += feature.undefined;
    this.other += feature.other;
  }

}
