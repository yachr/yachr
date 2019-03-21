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
    let features: ICucumberResult[] = happyDayResult;
    let summary = aggregator.getSummaryForSuite(features)

    const expectedOutput = {
        features: [
          {
            featureName: 'Login',
            featureSummary: {
              ambiguous: 0,
              failed: 0,
              passed: 2,
              pending: 0,
              scenarioName: "",
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
          scenarioName: "",
          totalDuration: 2,
          undefined: 3,
          unknown: 0,
        }
    };

    console.log(summary);

    // Had to do the JSON dance here to loose the _proto property
    // from summary before doing the compare
    expect(JSON.parse(JSON.stringify(summary))).to.be.deep.equal(expectedOutput);
  });
});

