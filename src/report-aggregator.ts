import { CucumberReportSummary } from './models/cucumber-report-summary';
import { ICucumberReport } from './models/cucumber-report';
import { IStep } from './models/step';
import { IElement } from './models/element';


interface IFeatureSummary {
  scenarios: CucumberReportSummary[],
  featureSummary: CucumberReportSummary,
  featureName: string
}

interface ISuiteSummary {
  features: IFeatureSummary[],
  suiteSummary: CucumberReportSummary,
}

export class ReportAggregator {

  public getSummaryForSuite(suite: ICucumberReport[]): ISuiteSummary {
    const suiteSummary = new CucumberReportSummary();

    const response: ISuiteSummary = { features: [], suiteSummary: null }

    suite.forEach(feature => {
      const featureSummary = this.getSummaryForFeature(feature);
      suiteSummary.aggregateChildSummary(featureSummary.featureSummary);
      response.features.push(featureSummary);
    })

    response.suiteSummary = suiteSummary;
    return response;
  }


  public getSummaryForFeature(feature: ICucumberReport) : IFeatureSummary {
    const featureSummary = new CucumberReportSummary();

    const response: IFeatureSummary = { scenarios: [], featureSummary: null, featureName: feature.name }

    feature.elements.forEach(scenario => {
      const scenarioSummary = this.getSummaryForScenario(scenario);
      featureSummary.aggregateChildSummary(scenarioSummary);
      response.scenarios.push(scenarioSummary);
    })

    response.featureSummary = featureSummary
    return response;

  }

  public getSummaryForScenario(scenario: IElement): CucumberReportSummary {
    const scenarioSummary = new CucumberReportSummary();

    // Aggregate steps
    scenario.steps.forEach( s => {
      const stepSummary = this.summariseStep(s);
      scenarioSummary.aggregateChildSummary(stepSummary);
    });

    scenarioSummary.scenarioName = scenario.name;
    return scenarioSummary;
  }

  private summariseStep(step: IStep): CucumberReportSummary {
    const stepSummary = new CucumberReportSummary();

    if(step.result) {
      stepSummary.updateFromReportResult(step.result);
    }

    return stepSummary;
  }
}
