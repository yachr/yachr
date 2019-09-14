// import { expect } from 'chai';
// import * as fs from 'fs';
// import { } from 'mocha';

// import { IReportOptions } from './models/reportOptions';
// import { Reporter } from './reporter';

// describe('reporter manual', () => {
//   let reporter: Reporter;
//   beforeEach(() => {
//     reporter = new Reporter();
//   });

//   // Use this to test the reporter during local development
//   it.only('should generate a report', () => {
//     const options: IReportOptions = {
//       jsonFile: './src/samples/results-manual.json',
//       output: './src/samples/sample-manual.html'
//     };

//     reporter.generate(options);

//     expect(
//       fs.existsSync(options.output),
//       `Error: test did not produce ${options.output}`
//     ).to.be.equal(true);
//   });
// });
