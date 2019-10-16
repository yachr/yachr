// tslint:disable-next-line: file-name-casing
import { expect } from 'chai';
import * as cherrio from 'cheerio';
import { Given, Then, When } from 'cucumber';
import * as fs from 'fs';
import { IReportOptions } from '../../dist/src/models/reportOptions';

import { Reporter } from '../../dist/src/reporter';
const reportLocation = 'e2e/reportOutput/report-summary-tags.html';
const jsonOutput = 'e2e/resources/tagsOnScenariosAndFunctions.json';

let reporter: Reporter;
let reportOptions: IReportOptions;
// tslint:disable-next-line: max-line-length
Given(`Jon has results from a cucumber test containing the tag '@GH-30' against the scenario 'View scenario tag'`, () => {
  reportOptions = <IReportOptions>{
    jsonFile: jsonOutput,
    output: reportLocation,
  };
});

When(`Jon runs yachr against the result`, () => {
  reporter = new Reporter();
  reporter.generate(reportOptions);
});

// tslint:disable-next-line: max-line-length
Then(`Jon will see the tag '@GH-30' in the title bar of the scenario 'View Scenario tag' in the generated report`, () => {
  const $ = cherrio.load(fs.readFileSync(reportLocation, 'utf8'));
  const pageText = $('html').text();

  // ([.\n\s]*)1/ Match all spaces and new line chars
  const passedFeatures = /@GH-30([.\n\s]*)Scenario: View Feature tag/;
  expect(passedFeatures.test(pageText)).eql(true);
});
