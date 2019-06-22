import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import * as fs from 'fs';
import { IReportOptions } from '../../dist/src/models/reportOptions';

import { Reporter } from '../../dist/src/reporter';
import * as passingScenario from '../resources/onePassingScenario.json';

import * as cherrio from 'cheerio';
const reportLocation = 'e2e/reportOutput/report.html';

let jsonOutput;
let reporter: Reporter;
let reportOptions: IReportOptions;

Given('a passing scenario', function (table) {
  reportOptions = <IReportOptions>{
    jsonFile: 'e2e/resources/onePassingScenario.json',
    output: reportLocation,
  };
});

When('I run yachr against it', function () {
  reporter = new Reporter();
  reporter.generate(reportOptions);
});

Then('a summary showing one passing feature and one passing scenario', async function () {
  const $ = cherrio.load(fs.readFileSync(reportLocation, 'utf8'));
  const pageText = $('html').text();

  const passedFeatures = /Features([.\n\s]*)1/;
  expect(passedFeatures.test(pageText)).eql(true);
});
