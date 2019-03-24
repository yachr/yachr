import { ICucumberFeature } from './models/cucumberFeature';
import { ICucumberFeatureSuite } from './models/cucumberFeatureSuite';
import { CucumberReportSummary } from './models/cucumberReportSummary';
import { IFeatureSummary } from './models/featureSummary';
import { IScenario } from './models/scenario';
import { IStep } from './models/step';
import { ISuiteSummary } from './models/suiteSummary';

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
  public getSummaryForSuite(suite: ICucumberFeatureSuite): ISuiteSummary {
    // TODO: I've defined a datamodel for a FeatureSuite. Update code to reflect this

    const response: ISuiteSummary = {
      features: [],
      suiteSummary: new CucumberReportSummary()
    };

    suite.features.forEach(feature => {
      const featureSummary = this.getSummaryForFeature(feature);

      if (featureSummary.featureSummary) {
        response.suiteSummary.aggregateChildSummary(featureSummary.featureSummary);
      }

      response.features.push(featureSummary);
    });

    response.suiteSummary = response.suiteSummary;
    return response;
  }

  /**
   * Aggregates a single feature. Aggregates all scenarios in the feature to generate a summary.
   * @param feature The feature to aggregate
   */
  public getSummaryForFeature(feature: ICucumberFeature): IFeatureSummary {
    const response: IFeatureSummary = {
      featureName: feature.name,
      featureSummary: new CucumberReportSummary(),
      scenarios: []
    };

    feature.elements.forEach(scenario => {
      const scenarioSummary = this.getSummaryForScenario(scenario);
      response.featureSummary.aggregateChildSummary(scenarioSummary);
      response.scenarios.push(scenarioSummary);
    });

    return response;
  }

  /**
   * Aggregates a single scenario. Aggregates the results of all steps in the Scenario to generate a summary.
   * @param scenario The scenario to aggregate
   */
  public getSummaryForScenario(scenario: IScenario): CucumberReportSummary {
    const scenarioSummary = new CucumberReportSummary();

    // Aggregate steps
    scenario.steps.forEach(s => {
      const stepSummary = this.summariseStep(s);
      scenarioSummary.aggregateChildSummary(stepSummary);
    });

    scenarioSummary.scenarioName = scenario.name;
    return scenarioSummary;
  }

  /**
   * Summarises the result of a single Gherkin Step
   * @param step The Cucumber Test result of the Gherkin step
   */
  private summariseStep(step: IStep): CucumberReportSummary {
    const stepSummary = new CucumberReportSummary();

    if (step.result) {
      stepSummary.updateFromReportResult(step.result);
    }

    return stepSummary;
  }
}
