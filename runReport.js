var yachr = require("yachr");
var reporter = new yachr.Reporter();

reporter.generate({
  jsonFile: 'reports/cucumber-report.json', // Location of the output from running cucumberjs
  output: 'reports/yachr.html'
});
