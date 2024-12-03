var common = [
  './e2e/features',
  // '--require ./e2e/step_definitions/**/*.steps.js',
  '--require \'e2e/step_definitions/**/*.ts\'', // Load step definitions
  '--require-module ts-node/register', // Load TypeScript module
  '--format json:./reports/cucumber-report.json',
  '--no-strict', // Don't fail the build if there are pending scenarios
].join(' ');

module.exports = {
  default: common,
};
