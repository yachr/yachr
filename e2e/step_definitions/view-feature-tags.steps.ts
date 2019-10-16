// tslint:disable-next-line: file-name-casing
import { expect } from 'chai';
import * as cherrio from 'cheerio';
import { Given, Then, When } from 'cucumber';
import * as fs from 'fs';
import { IReportOptions } from '../../dist/src/models/reportOptions';

import { Reporter } from '../../dist/src/reporter';
const reportLocation = 'e2e/reportOutput/report-feature-tags.html';
const jsonOutput = 'e2e/resources/tagsOnScenariosAndFunctions.json';

let reporter: Reporter;
let reportOptions: IReportOptions;

// tslint:disable-next-line: max-line-length
Given(`Ira has results from a cucumber test containing the tag '@GH-30' against the feature 'View Feature tag'`, () => {
  reportOptions = <IReportOptions> {
    jsonFile: jsonOutput,
    output: reportLocation,
  };
});

When(`Ira runs yachr against the result`, () => {
  reporter = new Reporter();
  reporter.generate(reportOptions);
});

Then(`Ira will see the tag '@GH-30' in the tile bar of the 'View Feature tag' feature`, () => {
  const $ = cherrio.load(fs.readFileSync(reportLocation, 'utf8'));
  const pageText = $('html').text();

  // ([.\n\s]*)1/ Match all spaces and new line chars
  const passedFeatures = /@GH-30([.\n\s]*)Ability: View tags in report/;
  expect(passedFeatures.test(pageText)).eql(true);
});
