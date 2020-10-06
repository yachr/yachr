import { expect } from 'chai';
import { Given, Then } from 'cucumber';
import * as fs from 'fs';

import { IReportOptions } from '../../dist/src/models/reportOptions';
import { Reporter } from '../../dist/src/reporter';

const reportLocation = 'e2e/reportOutput/summary-of-graphs.html';
const jsonOutput = 'e2e/resources/twoPassingScenarios.json';

let reporter: Reporter;
let reportOptions: IReportOptions;

Given(`Lina is viewing a cucumber report with:`, table => {
  reportOptions = <IReportOptions> {
    jsonFile: jsonOutput,
    output: reportLocation,
  };

  reporter = new Reporter();
  reporter.generate(reportOptions);
});

Then(`Lina should see the following titles over the bar graphs`, table => {
  const pageText = fs.readFileSync(reportLocation, 'utf8');

  // ([.\n\s]*)1/ Match all spaces and new line chars
  const featureTitle = /Feature Summary \(1 Total\)/;
  expect(featureTitle.test(pageText)).eql(true);

  const scenarioTitle = /Scenario Summary \(2 Total\)/;
  expect(scenarioTitle.test(pageText)).eql(true);
});
