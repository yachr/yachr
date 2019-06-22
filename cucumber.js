var common = [
  '--require ./e2e/step_definitions/**/*.steps.js',
  '--format json:./reports/cucumber-report.json',
].join(' ');

module.exports = {
  default: common,
};
