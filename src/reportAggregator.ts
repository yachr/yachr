import { CucumberReportSummary } from './models/cucumberReportSummary';
import { ICucumberResult } from './models/cucumberResult';
import { IStep } from './models/step';
import { IElement } from './models/element';
import { ISuiteSummary } from './models/suiteSummary';
import { IFeatureSummary } from './models/featureSummary';



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
  public getSummaryForSuite(suite: ICucumberResult[]): ISuiteSummary {
    const response: ISuiteSummary = {
      features: [],
      suiteSummary: new CucumberReportSummary()
    };

    suite.forEach(feature => {
      const featureSummary = this.getSummaryForFeature(feature);

      if (featureSummary.featureSummary) {
        response.suiteSummary.aggregateChildSummary(featureSummary.featureSummary);
      }

      response.features.push(featureSummary);
    })

    response.suiteSummary = response.suiteSummary;
    return response;
  }

  public getSummaryForFeature(feature: ICucumberResult): IFeatureSummary {
    const response: IFeatureSummary = { scenarios: [], featureSummary: new CucumberReportSummary(), featureName: feature.name }

    feature.elements.forEach(scenario => {
      const scenarioSummary = this.getSummaryForScenario(scenario);
      response.featureSummary.aggregateChildSummary(scenarioSummary);
      response.scenarios.push(scenarioSummary);
    })

    return response;
  }

  public getSummaryForScenario(scenario: IElement): CucumberReportSummary {
    const scenarioSummary = new CucumberReportSummary();

    // Aggregate steps
    scenario.steps.forEach(s => {
      const stepSummary = this.summariseStep(s);
      scenarioSummary.aggregateChildSummary(stepSummary);
    });

    scenarioSummary.scenarioName = scenario.name;
    return scenarioSummary;
  }

  private summariseStep(step: IStep): CucumberReportSummary {
    const stepSummary = new CucumberReportSummary();

    if (step.result) {
      stepSummary.updateFromReportResult(step.result);
    }

    return stepSummary;
  }
}
