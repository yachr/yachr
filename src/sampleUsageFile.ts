/**
 * This file has been included as an example usage of the library.
 *
 * Require the reporter, call generate and pass in the reportOptions.
 */

import { Reporter } from './reporter';

const reporter = new Reporter();

reporter.generate({
  htmlTemplate: __dirname + '/templates/standard.html', // Optional
  jsonFile: __dirname + '/samples/results.json',
  output: __dirname + '/samples/report.html'
});
