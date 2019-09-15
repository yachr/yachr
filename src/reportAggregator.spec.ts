import { expect } from 'chai';
import { } from 'mocha';

import { ICucumberFeatureSuite } from './models/reporter/cucumberFeatureSuite';
import { ReportAggregator } from './reportAggregator';
import * as happyDayResult from './samples/results.json';
import * as skippedStep from './samples/skipped-step.json';
import { ScenarioSummary } from './models/aggregator/scenarioSummary';
import { SuiteSummary } from './models/aggregator/suiteSummary';
import { FeatureSummary } from './models/aggregator/featureSummary';
import { FeatureSuiteSummary } from './models/aggregator/featureSuiteSummary';
import { ScenarioSuiteSummary } from './models/aggregator/scenarioSuiteSummary';

describe('report-aggregator', () => {
  let aggregator: ReportAggregator;
  let suite: ICucumberFeatureSuite;

  beforeEach(() => {
    aggregator = new ReportAggregator();
    suite = { features: happyDayResult };
  });

  it('should aggregate a scenario', () => {
    const summary = aggregator.getSummaryForScenario(suite.features[0].elements[0]);

    const expectedOutput = {
      ambiguous: 0,
      failed: 0,
      passed: 3,
      pending: 0,
      scenarioDescription: '',
      scenarioKeyword: 'Scenario',
      scenarioName: 'Login via login page',
      skipped: 0,
      totalDuration: 2,
      undefined: 0
    } as ScenarioSummary;

    // Had to do the JSON dance here to lose the _proto property
    // from summary before doing the compare
    expect(JSON.parse(JSON.stringify(summary))).to.be.deep.equal(expectedOutput);
  });

  it('should aggregate a feature', () => {
    const summary = aggregator.getSummaryForFeature(suite.features[0]);

    const scenarioSummary = {
      ...new ScenarioSummary(), ...{
        passed: 3,
        scenarioKeyword: 'Scenario',
        scenarioName: 'Login via login page',
        totalDuration: 2,
      }
    } as ScenarioSummary;

    const expectedOutput: FeatureSummary = {
      ...new FeatureSummary(), ...{
        featureDescription: 'Sample Feature Description',
        featureKeyword: 'Ability',
        featureName: 'Login',
        passingScenarios: [scenarioSummary]
      }
    } as FeatureSummary;

    // Had to do the JSON dance here to loose the _proto property
    // from summary before doing the compare
    expect(JSON.parse(JSON.stringify(summary))).to.be.deep
      .equal(JSON.parse(JSON.stringify(expectedOutput)));
  });

  it('should aggregate a feature suite', () => {
    const summary = aggregator.getSummaryForSuite(suite);

    const scenarioSummary = {
      ...new ScenarioSummary(),
      ...{
        passed: 3,
        scenarioKeyword: 'Scenario',
        scenarioName: 'Login via login page',
        totalDuration: 2,
      }
    };

    const featureSummary = {
      ...new FeatureSummary(), ...{
        featureDescription: 'Sample Feature Description',
        featureKeyword: 'Ability',
        featureName: 'Login',
        passingScenarios: [scenarioSummary]
      }
    } as FeatureSummary;

    const expectedOutput: SuiteSummary = {
      ...new SuiteSummary(),
      ...{
        featureSummary: {
          ...new FeatureSuiteSummary(),
          ...{
            passingFeatures: [featureSummary]
          }
        } as FeatureSuiteSummary,
        scenarioSummary: {
          ...new ScenarioSuiteSummary(), ...{
            passingScenarios: [scenarioSummary]
          }
        } as ScenarioSuiteSummary
      }
    };

    // Had to do the JSON dance here to loose the _proto property
    // from summary before doing the compare
    expect(JSON.parse(JSON.stringify(summary))).to.be.deep
      .equal(JSON.parse(JSON.stringify(expectedOutput)));
  });

  it('should aggregate skipped steps', () => {
    const skippedSuite: ICucumberFeatureSuite = { features: skippedStep };
    const summary = aggregator.getSummaryForScenario(skippedSuite.features[0].elements[0]);

    const expectedSuiteSummary = {
      ambiguous: 0,
      failed: 0,
      passed: 0, // This shouldn't be a pass, its a hidden step
      pending: 1,
      scenarioDescription: '',
      scenarioKeyword: 'Scenario',
      scenarioName: 'Login via login page',
      skipped: 1,
      totalDuration: 30,
      undefined: 0,
    };

    console.debug(summary.passed);
    console.debug(expectedSuiteSummary.passed);

    expect(JSON.parse(JSON.stringify(summary)))
      .to.be.deep.equal(expectedSuiteSummary);
  });
});
