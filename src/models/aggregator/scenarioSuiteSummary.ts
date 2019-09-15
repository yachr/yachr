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
  public ambiguousScenarios: ScenarioSummary[] = [];
  public pendingScenarios: ScenarioSummary[] = [];
  public undefinedScenarios: ScenarioSummary[] = [];

  /** The total number of Scenarios that are ambiguously defined from all Features */
  public get ambiguous(): number { return this.ambiguousScenarios.length; }

  /** The total number of scenarios that have failed from all Features */
  public get failed(): number { return this.failingScenarios.length; }

  /** The total number of scenarios that are not implemented from all Features (and thus marked as undefined) */
  public get undefined(): number { return this.undefinedScenarios.length; }

  /** The total number of Scenarios that are not implemented (and thus marked as pending) */
  public get pending(): number { return this.pendingScenarios.length; }

  /** The total number of scenarios that have passed from all Features */
  public get passed(): number { return this.passingScenarios.length; }

  /** All scenarios in this the entire Cucumber Test Suite  */
  get total(): number {
    return this.ambiguous + this.failed + this.undefined + this.pending + this.passed;
  }

  /** Updates the Scenario Suite Summary using information gathered in the Feature Summary */
  public aggregateFeature(feature: FeatureSummary): void {
    this.passingScenarios = this.passingScenarios.concat(feature.passingScenarios);
    this.failingScenarios = this.failingScenarios.concat(feature.failingScenarios);
    this.ambiguousScenarios = this.ambiguousScenarios.concat(feature.ambiguousScenarios);
    this.pendingScenarios = this.pendingScenarios.concat(feature.pendingScenarios);
    this.undefinedScenarios = this.undefinedScenarios.concat(feature.undefinedScenarios);
  }

}
