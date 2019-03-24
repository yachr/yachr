import { expect } from 'chai';
import { } from 'mocha';

import { ICucumberResult } from './models/cucumberResult';
import { ReportAggregator } from './reportAggregator';
import * as happyDayResult from './samples/results.json';
import * as skippedStep from './samples/skipped-step.json';

describe('report-aggregator', () => {
  let aggregator: ReportAggregator;

  beforeEach(() => {
    aggregator = new ReportAggregator();
  });

  it('should aggregate the features', () => {
    const features: ICucumberResult[] = happyDayResult;
    const summary = aggregator.getSummaryForSuite(features);

    const expectedOutput = {
        features: [
          {
            featureName: 'Login',
            featureSummary: {
              ambiguous: 0,
              failed: 0,
              passed: 2,
              pending: 0,
              scenarioName: '',
              skipped: 0,
              totalDuration: 2,
              undefined: 3,
              unknown: 0,
            },
            scenarios: [
              {
                ambiguous: 0,
                failed: 0,
                passed: 2,
                pending: 0,
                scenarioName: 'Login via login page',
                skipped: 0,
                totalDuration: 2,
                undefined: 3,
                unknown: 0
              }
            ]
          }
        ],
        suiteSummary: {
          ambiguous: 0,
          failed: 0,
          passed: 2,
          pending: 0,
          scenarioName: '',
          skipped: 0,
          totalDuration: 2,
          undefined: 3,
          unknown: 0,
        }
    };

    console.info(summary);

    // Had to do the JSON dance here to loose the _proto property
    // from summary before doing the compare
    expect(JSON.parse(JSON.stringify(summary))).to.be.deep.equal(expectedOutput);
  });

  it('should aggregate skipped steps', () => {
    const features: ICucumberResult[] = skippedStep;
    const summary = aggregator.getSummaryForScenario(features[0].elements[0]);

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
