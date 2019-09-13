import { FeatureSummary } from './featureSummary';

/**
 * A high level summary of used for dashboard reporting.
 * Represents the total number of passing/failing features
 * in the entire Cucumber Test Report
 */
export class FeatureSuiteSummary {

  public passingFeatures: FeatureSummary[] = [];
  public failingFeatures: FeatureSummary[] = [];
  public ambiguousFeatures: FeatureSummary[] = [];
  public pendingFeatures: FeatureSummary[] = [];
  public undefinedFeatures: FeatureSummary[] = [];

  /** The total number of Scenarios that are ambiguously defined for the Feature */
  public get ambiguous(): number { return this.ambiguousFeatures.length; }

  /** The total number of features that have failed */
  public get failed(): number { return this.failingFeatures.length; }

  /** The total number of features that are not implemented (and thus marked as undefined) */
  public get undefined(): number { return this.undefinedFeatures.length; }

  /** The total number of features that have passed */
  public get pending(): number { return this.pendingFeatures.length; }

  /** The total number of features that have passed */
  public get passed(): number { return this.passingFeatures.length; }

  /** All features in this group  */
  get total(): number {
    return this.ambiguous + this.failed + this.undefined + this.pending + this.passed;
  }

  /** Whether the Suite or Feature has failed due to a failed Feature or Scenario */
  get isFailed(): boolean { return this.failed > 0; }

  /** Whether the Suite or Feature has passed due to all steps passing */
  get isPassed(): boolean { return this.passed === this.total; }

  /** Whether the entire Suite or Feature is undefined */
  get isUndefined(): boolean { return this.undefined === this.total; }

  /** Updates the aggregated summary using information gathered in the Element Summary */
  public aggregateFeature(feature: FeatureSummary): void {

    if (feature.hasAmbiguous) { this.ambiguousFeatures.push(feature); }
    else if (feature.hasFailed) { this.failingFeatures.push(feature); }
    else if (feature.hasUndefined) { this.undefinedFeatures.push(feature); }
    else if (feature.hasPending) { this.pendingFeatures.push(feature); }
    else if (feature.isPassed) { this.passingFeatures.push(feature); }
    else { throw new Error('Scenario cannot be aggregated. Please raise a GitHub issue with the Yachr Team'); }
  }

}
