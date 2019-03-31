import { ScenarioSummary } from './scenarioSummary';

/**
 * A summary of all scenarios in a Feature.
 * Aggregates all scenarios in the feature to report the total number
 * of passing/failing scenarios within the feature
 */
export class FeatureSummary {

  public featureName: string = '';

  public passingScenarios: ScenarioSummary[] = [];
  public failingScenarios: ScenarioSummary[] = [];
  public undefinedScenarios: ScenarioSummary[] = [];
  public partialScenarios: ScenarioSummary[] = [];

  /** The total number of Scenarios that have passed in this Feature */
  public get passed(): number { return this.passingScenarios.length; }

  /** The total number of Scenarios that have failed in this Feature */
  public get failed(): number { return this.failingScenarios.length; }

  /** The total number of Scenarios that are not implemented (and thus marked as undefined) */
  public get undefined(): number { return this.undefinedScenarios.length; }

  /** Keeps track of partially passing statuses */
  public get partial(): number { return this.partialScenarios.length; }

  /** All Scenarios in this Feature  */
  get total(): number {
    return this.passed + this.failed + this.undefined + this.partial;
  }

  /** Whether the Feature has failed due to a failed Scenario */
  get isFailed(): boolean { return this.failed > 0; }

  /** Whether the Feature has passed due to all Scenarios passing */
  get isPassed(): boolean { return this.passed === this.total; }

  /** Whether the entire Feature is entirely undefined */
  get isUndefined(): boolean { return this.undefined === this.total; }

  /** Updates the Feature summary using information gathered in the Scenario Summary */
  public aggregateScenario(scenario: ScenarioSummary): void {
    if (scenario.isFailed) { this.failingScenarios.push(scenario); }
    else if (scenario.isPassed) { this.passingScenarios.push(scenario); }
    else if (scenario.isUndefined) { this.undefinedScenarios.push(scenario); }
    else { this.partialScenarios.push(scenario); }
  }

}
