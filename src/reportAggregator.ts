import { FeatureSuiteSummary } from './models/aggregator/featureSuiteSummary';
import { FeatureSummary } from './models/aggregator/featureSummary';
import { ScenarioSuiteSummary } from './models/aggregator/scenarioSuiteSummary';
import { ScenarioSummary } from './models/aggregator/scenarioSummary';
import { SuiteSummary } from './models/aggregator/suiteSummary';
import { ICucumberFeature } from './models/reporter/cucumberFeature';
import { ICucumberFeatureSuite } from './models/reporter/cucumberFeatureSuite';
import { IScenario } from './models/reporter/scenario';

/**
 * Aggregates up an array of CucumberResults.
 * @example
 * var results: ICucumberResult[] = // Read in Cucumber results json file(s)
 * const reporter = new ReportAggregator();
 * var suiteSummary = reporter.getSummaryForSuite(results);
 */
export class ReportAggregator {

  /**
   * Highest level aggregation, takes an array of ICucumberResults and returns
   * an `ISuiteSummary`
   * @param suite Array of cucumber results. Standard output from a cucumber test being run.
   */
  public getSummaryForSuite(suite: ICucumberFeatureSuite): SuiteSummary {

    // Used to aggregates total passing/failing features
    const featureSuiteSummary = new FeatureSuiteSummary();

    // Used to aggregate total passing/failing scenarios
    const scenarioSuiteSummary = new ScenarioSuiteSummary();

    suite.features.forEach(feature => {

      // The feature summary is a count of all passing / failing scenarios
      // for this given feature
      const featureSummary = this.getSummaryForFeature(feature);

      featureSummary.tags = feature.tags.map((tag => tag.name)).join(', ');
      featureSuiteSummary.aggregateFeature(featureSummary);
      scenarioSuiteSummary.aggregateFeature(featureSummary);
    });

    const suiteSummary = new SuiteSummary();
    suiteSummary.featureSummary = featureSuiteSummary;
    suiteSummary.scenarioSummary = scenarioSuiteSummary;
    return suiteSummary;
  }

  /**
   * Aggregates a single feature. Aggregates all scenarios in the feature to generate a summary.
   * @param feature The feature to aggregate
   */
  public getSummaryForFeature(feature: ICucumberFeature): FeatureSummary {
    const summary = new FeatureSummary();

    // We now start reporting at a higher level
    // How many scenarios are passing, failing, etc.

    feature.elements.forEach(scenario => {
      const scenarioSummary = this.getSummaryForScenario(scenario);

      // The summary scenario tells us how many steps are passing, failing, etc.
      // We are interested in whether the whole scenario has passes, failed, etc. for this feature
      summary.aggregateScenario(scenarioSummary);
    });

    // Add metadata
    summary.featureName = feature.name;
    summary.featureDescription = feature.description;
    summary.featureKeyword = feature.keyword;

    return summary;
  }

  /**
   * Aggregates a single scenario. Aggregates the results of all steps in the Scenario to generate a summary.
   * @param scenario The scenario to aggregate
   */
  public getSummaryForScenario(scenario: IScenario): ScenarioSummary {
    const summary = new ScenarioSummary();

    summary.steps = scenario.steps.filter(step => !step.hidden);

    // Aggregate steps
    scenario.steps.forEach(s => {
      if (s.result) {
        summary.aggregateStep(s.result, s.hidden);
      }
    });

    // Add metadata
    summary.scenarioName = scenario.name;
    summary.scenarioDescription = scenario.description || '';
    summary.scenarioKeyword = scenario.keyword;
    summary.tags = scenario.tags.map((tag => tag.name)).join(', ');

    return summary;
  }
}
