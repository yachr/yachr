import { FeatureSummary } from './featureSummary';

/**
 * A high level summary of used for dashboard reporting.
 * Represents the total number of passing/failing features
 * in the entire Cucumber Test Report
 */
export class FeatureSuiteSummary {

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
    return this.passed + this.failed + this.undefined + this.other;
  }

  /** Whether the Suite or Feature has failed due to a failed Feature or Scenario */
  get isFailed(): boolean { return this.failed > 0; }

  /** Whether the Suite or Feature has passed due to all steps passing */
  get isPassed(): boolean { return this.passed === this.total; }

  /** Whether the entire Suite or Feature is undefined */
  get isUndefined(): boolean { return this.undefined === this.total; }

  /** Updates the aggregated summary using information gathered in the Element Summary */
  public aggregateFeature(feature: FeatureSummary): void {
    if (feature.isFailed) { this.failed++; }
    else if (feature.isPassed) { this.passed++; }
    else if (feature.isUndefined) { this.undefined++; }
    else {
      console.warn('Unmapped value for feature ', feature);
      this.other++;
    }

  }

}
