import { expect } from 'chai';
import { } from 'mocha';
import { ReportAggregator } from './report-aggregator';
import * as happyDayResult from './samples/results.json';
import { ICucumberResult } from './models/cucumber-result';

describe('report-aggregator', () => {
  let aggregator: ReportAggregator;

  beforeEach(() => {
    aggregator = new ReportAggregator();
  });

  it('should aggregate the features', () => {
    let features: ICucumberResult = happyDayResult[0];
    let summary = aggregator.getSummaryForFeature(features)

    const expectedOutput = {
      scenarios:
        [          {
            passed: 2,
            failed: 0,
            undefined: 3,
            pending: 0,
            ambiguous: 0,
            unknown: 0,
            totalDuration: 2,
            scenarioName: 'Login via login page'
          }],
      featureSummary:
      {
        passed: 2,
        failed: 0,
        undefined: 3,
        pending: 0,
        ambiguous: 0,
        unknown: 0,
        totalDuration: 2,
        scenarioName: ''
      },
      featureName: 'Login'
    };

    console.log(summary);

    // Had to do the JSON dance here to loose the _proto property
    // from summary before doing the compare
    expect(JSON.parse(JSON.stringify(summary))).to.be.deep.equal(expectedOutput);
  });
});

