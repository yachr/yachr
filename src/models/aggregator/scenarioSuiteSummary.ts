import { FeatureSummary } from './featureSummary';
import { ScenarioSummary } from './scenarioSummary';

/**
 * A high level summary of used for dashboard reporting.
 * Represents a summary of all scenarios from multiple features
 * in the test suite
 */
export class ScenarioSuiteSummary {

  public passingScenarios: ScenarioSummary[] = [];
  public failingScenarios: ScenarioSummary[] = [];
  public undefinedScenarios: ScenarioSummary[] = [];
  public partialScenarios: ScenarioSummary[] = [];

  /** The total number of scenarios that have passed from all Features */
  public get passed(): number { return this.passingScenarios.length; }

  /** The total number of scenarios that have failed from all Features */
  public get failed(): number { return this.failingScenarios.length; }

  /** The total number of scenarios that are not implemented from all Features (and thus marked as undefined) */
  public get undefined(): number { return this.undefinedScenarios.length; }

  /** Keeps track of partially passing Scenarios */
  public get partial(): number { return this.partialScenarios.length; }

  /** All scenarios in this the entire Cucumber Test Suite  */
  get total(): number {
    return this.passed + this.failed + this.undefined + this.partial;
  }

  /** Updates the Scenario Suite Summary using information gathered in the Feature Summary */
  public aggregateFeature(feature: FeatureSummary): void {
    this.passingScenarios = this.passingScenarios.concat(feature.passingScenarios);
    this.failingScenarios = this.failingScenarios.concat(feature.failingScenarios);
    this.undefinedScenarios = this.undefinedScenarios.concat(feature.undefinedScenarios);
    this.partialScenarios = this.partialScenarios.concat(feature.partialScenarios);
  }

}
