/**
 * This js file has been included as an example usage of the library.
 *
 * Require the reporter, call generate and pass in the reportOptions.
 */

import  { Reporter }  from './reporter';

const reporter = new Reporter();

reporter.generate({
  jsonFile: 'dist/samples/results.json',
  output: 'dist/samples/report.html',
  htmlTemplate: 'dist/src/templates/standard.html'
});
