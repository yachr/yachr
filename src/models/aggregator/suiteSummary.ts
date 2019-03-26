import { FeatureSuiteSummary } from './featureSuiteSummary';
import { FeatureSummary } from './featureSummary';

/**
 * An aggregation summary of all Features, and all Scenarios
 * in the test suite.
 */
export class SuiteSummary {

  /**
   * The aggregated summary of all features.
   * Identifies the total number of features passing,
   * failing, etc.
   */
  public featureSummary: FeatureSuiteSummary = new FeatureSuiteSummary();

  /**
   * The aggregated summary of all scenarios (spanning
   * multiple features). Identifies the total number of
   * scenarios passing, failing, etc.
   */
  public scenarioSummary: FeatureSummary[] = [];
}
