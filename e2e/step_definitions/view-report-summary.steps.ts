import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import * as fs from 'fs';
import { IReportOptions } from '../../dist/src/models/reportOptions';

import { Reporter } from '../../dist/src/reporter';
import * as passingScenario from '../resources/onePassingScenario.json';

import * as cherrio from 'cheerio';
const reportLocation = 'e2e/reportOutput/report.html';
const jsonOutput = 'e2e/resources/onePassingScenario.json';

let reporter: Reporter;
let reportOptions: IReportOptions;

Given('a passing scenario', table => {
  reportOptions = <IReportOptions> {
    jsonFile: jsonOutput,
    output: reportLocation,
  };
});

Given('the following scenarios', table =>
  'pending');

When('I run yachr against it', () => {
  reporter = new Reporter();
  reporter.generate(reportOptions);
});

Then('a summary showing one passing feature and one passing scenario', async () => {
  const $ = cherrio.load(fs.readFileSync(reportLocation, 'utf8'));
  const pageText = $('html').text();

  console.debug(pageText);

  // ([.\n\s]*)1/ Match all spaces and new line chars
  const passedFeatures = /Ability: View report summary([.\n\s]*)done1/;
  expect(passedFeatures.test(pageText)).eql(true);
});

Then('I will see the following in the summary', () =>
  'pending');
