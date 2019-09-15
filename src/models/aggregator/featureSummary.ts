import { ScenarioSummary } from './scenarioSummary';

/**
 * A summary of all scenarios in a Feature.
 * Aggregates all scenarios in the feature to report the total number
 * of passing/failing scenarios within the feature
 */
export class FeatureSummary {

  public featureName: string = '';
  public featureDescription: string = '';
  public featureKeyword: string = ''; // Ability / Feature

  public passingScenarios: ScenarioSummary[] = [];
  public failingScenarios: ScenarioSummary[] = [];
  public ambiguousScenarios: ScenarioSummary[] = [];
  public pendingScenarios: ScenarioSummary[] = [];
  public undefinedScenarios: ScenarioSummary[] = [];

  /** The total number of Scenarios that are ambiguously defined for the Feature */
  public get ambiguous(): number { return this.ambiguousScenarios.length; }

  /** The total number of Scenarios that have failed in this Feature */
  public get failed(): number { return this.failingScenarios.length; }

  /** The total number of Scenarios that are have no step definition (and thus marked as undefined) */
  public get undefined(): number { return this.undefinedScenarios.length; }

  /** The total number of Scenarios that are not implemented (and thus marked as pending) */
  public get pending(): number { return this.pendingScenarios.length; }

  /** The total number of Scenarios that have passed in this Feature */
  public get passed(): number { return this.passingScenarios.length; }

  /** All Scenarios in this Feature  */
  get total(): number {
    return this.ambiguous + this.failed + this.undefined + this.pending + this.passed;
  }

  /** Whether the Feature has at least one ambiguous Scenario */
  get hasAmbiguous(): boolean { return this.ambiguous > 0; }

  /** Whether the Feature has at least one failed Scenario */
  get hasFailed(): boolean { return this.failed > 0; }

  /** Whether the Feature has at least one undefined Scenario */
  get hasUndefined(): boolean { return this.undefined > 0; }

  /** Whether the Feature has at least one pending Scenario */
  get hasPending(): boolean {
    return this.pending > 0 ||
    this.hasNoScenarios;
  }

  get hasNoScenarios(): boolean { return this.total === 0; }

  /** Whether the Feature has passed due to all Scenarios passing */
  get isPassed(): boolean { return this.passed > 0 && this.passed === this.total; }

  /** Updates the Feature summary using information gathered in the Scenario Summary */
  public aggregateScenario(scenario: ScenarioSummary): void {
    // As per view-report-summary.feature
    // The status of a Scenario behaves like a hierarchy that rolls up.
    // The scenario status will be the 'worst' status of its child steps as follows:
    // ambiguous, failed, undefined, pending, passed
    // Although a step can be skipped, a scenario cannot.

    // - Ambiguous is the worst because it is similar to a compile erorr. There are
    //   two or more implementations that match one step, and the test simply can't be run.
    // - Failed is next because a step has been implemented, and failed, which is unexpected.
    // - Undefined is then next, because no implementation has been put together.
    // - Pending is where the implementation exists, but returns the string pending.
    // - Finally, if all steps pass, then the scenario passes.

    if (scenario.hasAmbiguous) { this.ambiguousScenarios.push(scenario); }
    else if (scenario.hasFailed) { this.failingScenarios.push(scenario); }
    else if (scenario.hasUndefined) { this.undefinedScenarios.push(scenario); }
    else if (scenario.hasPending) { this.pendingScenarios.push(scenario); }
    else if (scenario.isPassed) { this.passingScenarios.push(scenario); }
    else { throw new Error('Scenario cannot be aggregated. Please raise a GitHub issue with the Yachr Team'); }
  }

}
