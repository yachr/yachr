// tslint:disable-next-line: file-name-casing
import { expect } from 'chai';
import { Given, Then } from 'cucumber';
import * as fs from 'fs';
import { IReportOptions } from '../../dist/src/models/reportOptions';

import { Reporter } from '../../dist/src/reporter';
const reportLocation = 'e2e/reportOutput/understand-rankings.html';
const jsonOutput = 'e2e/resources/onePassingScenario.json';

let reporter: Reporter;
let reportOptions: IReportOptions;

// tslint:disable-next-line: max-line-length
Given(`Lina is viewing a cucumber report`, () => {
  reportOptions = <IReportOptions> {
    jsonFile: jsonOutput,
    output: reportLocation,
  };

  reporter = new Reporter();
  reporter.generate(reportOptions);
});

Then(`Lina should be able to see a legend explaining the status`, () => {
  const report = fs.readFileSync(reportLocation, 'utf8');

  const expectedText = 'The status of a scenario or feature is based on the ' +
    'worst status of its steps, in order: ambiguous -> failed -> undefined -> pending -> passed';

  expect(report.includes(expectedText)).to.equal(true);
});
