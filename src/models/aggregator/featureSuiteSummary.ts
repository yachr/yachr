import { FeatureSummary } from './featureSummary';

/**
 * A high level summary of used for dashboard reporting.
 * Represents the total number of passing/failing features
 * in the entire Cucumber Test Report
 */
export class FeatureSuiteSummary {

  public passingFeatures: FeatureSummary[] = [];
  public failingFeatures: FeatureSummary[] = [];
  public undefinedFeatures: FeatureSummary[] = [];
  public partialFeatures: FeatureSummary[] = [];

  /** The total number of features that have passed */
  public get passed(): number { return this.passingFeatures.length; }

  /** The total number of features that have failed */
  public get failed(): number { return this.failingFeatures.length; }

  /** The total number of features that are not implemented (and thus marked as undefined) */
  public get undefined(): number { return this.undefinedFeatures.length; }

  /** Keeps track of partially passing features */
  public get partial(): number { return this.partialFeatures.length; }

  /** All features in this group  */
  get total(): number {
    return this.passed + this.failed + this.undefined + this.partial;
  }

  /** Whether the Suite or Feature has failed due to a failed Feature or Scenario */
  get isFailed(): boolean { return this.failed > 0; }

  /** Whether the Suite or Feature has passed due to all steps passing */
  get isPassed(): boolean { return this.passed === this.total; }

  /** Whether the entire Suite or Feature is undefined */
  get isUndefined(): boolean { return this.undefined === this.total; }

  /** Updates the aggregated summary using information gathered in the Element Summary */
  public aggregateFeature(feature: FeatureSummary): void {
    if (feature.hasFailed) { this.failingFeatures.push(feature); }
    else if (feature.isPassed) { this.passingFeatures.push(feature); }
    else if (feature.isUndefined) { this.undefinedFeatures.push(feature); }
    else { this.partialFeatures.push(feature); }
  }

}
