import { expect } from 'chai';
import { } from 'mocha';

import { ICucumberFeatureSuite } from './models/reporter/cucumberFeatureSuite';
import { ReportAggregator } from './reportAggregator';
import * as happyDayResult from './samples/results.json';
import * as skippedStep from './samples/skipped-step.json';

describe('report-aggregator', () => {
  let aggregator: ReportAggregator;
  let suite: ICucumberFeatureSuite;

  beforeEach(() => {
    aggregator = new ReportAggregator();
    suite = { features: happyDayResult };
  });

  it ('should aggregate a scenario', () => {
    const summary = aggregator.getSummaryForScenario(suite.features[0].elements[0]);

    const expectedOutput = {
      ambiguous: 0,
      failed: 0,
      passed: 2,
      pending: 0,
      scenarioName: 'Login via login page',
      skipped: 0,
      totalDuration: 2,
      undefined: 3,
      unknown: 0
    };

    // Had to do the JSON dance here to loose the _proto property
    // from summary before doing the compare
    expect(JSON.parse(JSON.stringify(summary))).to.be.deep.equal(expectedOutput);
  });

  it ('should aggregate a feature', () => {
    const summary = aggregator.getSummaryForFeature(suite.features[0]);

    const scenarioSummary = {
      ambiguous: 0,
      failed: 0,
      passed: 2,
      pending: 0,
      scenarioName: 'Login via login page',
      skipped: 0,
      totalDuration: 2,
      undefined: 3,
      unknown: 0
    };

    const expectedOutput = {
      failingScenarios: [],
      featureName: 'Login',
      partialScenarios: [ scenarioSummary ],
      passingScenarios: [],
      undefinedScenarios: []
    };

    // Had to do the JSON dance here to loose the _proto property
    // from summary before doing the compare
    expect(JSON.parse(JSON.stringify(summary))).to.be.deep.equal(expectedOutput);
  });

  it('should aggregate a feature suite', () => {
    const summary = aggregator.getSummaryForSuite(suite);

    const scenarioSummary = {
      ambiguous: 0,
      failed: 0,
      passed: 2,
      pending: 0,
      scenarioName: 'Login via login page',
      skipped: 0,
      totalDuration: 2,
      undefined: 3,
      unknown: 0
    };

    const featureSummary = {
      failingScenarios: [],
      featureName: 'Login',
      partialScenarios: [ scenarioSummary ],
      passingScenarios: [],
      undefinedScenarios: []
    };

    const expectedOutput = {
      featureSummary: {
        failingFeatures: [],
        partialFeatures: [ featureSummary ],
        passingFeatures: [],
        undefinedFeatures: []
      },
      scenarioSummary: {
        failingScenarios: [],
        partialScenarios: [ scenarioSummary ],
        passingScenarios: [],
        undefinedScenarios: []
      }
    };

    // Had to do the JSON dance here to loose the _proto property
    // from summary before doing the compare
    expect(JSON.parse(JSON.stringify(summary))).to.be.deep.equal(expectedOutput);
  });

  it('should aggregate skipped steps', () => {
    const skippedSuite: ICucumberFeatureSuite = { features: skippedStep };
    const summary = aggregator.getSummaryForScenario(skippedSuite.features[0].elements[0]);

    const expectedSuiteSummary = {
      ambiguous: 0,
      failed: 0,
      passed: 1,
      pending: 1,
      scenarioName: 'Login via login page',
      skipped: 1,
      totalDuration: 30,
      undefined: 0,
      unknown: 0,
    };

    expect(JSON.parse(JSON.stringify(summary))).to.be.deep.equal(expectedSuiteSummary);
  });
});
