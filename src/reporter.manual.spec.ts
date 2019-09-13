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

//   it('should update options with required defaults if the user does not supply them', () => {
//     const options = <IReportOptions> { };

//     const actual = reporter.populateDefaultOptionsIfMissing(options);

//     // tslint:disable-next-line:no-unused-expression - This is just how Chai works
//     expect(actual.htmlTemplate).to.exist;
//   });

//   it('populateDefaultOptionsIfMissing should not overwrite existing values', () => {
//     const options = <IReportOptions> {
//       htmlTemplate: 'templatePath',
//       jsonFile: 'somepath'
//     };

//     const actual = reporter.populateDefaultOptionsIfMissing(options);

//     expect(actual.jsonFile, 'Error: Supplied value has been dropped').to.equal(options.jsonFile);
//     expect(actual.htmlTemplate, 'Error: supplied value overwritten by default').to.equal(options.htmlTemplate);
//   });
// });
