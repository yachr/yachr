// tslint:disable-next-line: file-name-casing
import { expect } from 'chai';
import { Given, Then } from 'cucumber';
import * as fs from 'fs';
import { IReportOptions } from '../../dist/src/models/reportOptions';

import { Reporter } from '../../dist/src/reporter';
const reportLocation = 'e2e/reportOutput/dataTableExample.html';
const jsonOutput = 'e2e/resources/dataTableExample.json';

let reporter: Reporter;
let reportOptions: IReportOptions;
// tslint:disable-next-line: max-line-length
Given(`Virginia has a step has a data table like the following:`, (_dataTable: any) => {
  reportOptions = <IReportOptions>{
    jsonFile: jsonOutput,
    output: reportLocation,
  };

  reporter = new Reporter();
  reporter.generate(reportOptions);
});

// tslint:disable-next-line: max-line-length
Then(`the report Virginia generates report should display the data table`, () => {
  const pageText = fs.readFileSync(reportLocation, 'utf8');

  // ([.\n\s]*)1/ Match all spaces and new line chars
  const passedFeatures = /or two/;
  expect(passedFeatures.test(pageText)).eql(true);
});
