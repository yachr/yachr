var common = [
  '--require ./features/**/*.steps.js',
  '--format json:./reports/cucumber-report.json',
].join(' ');

module.exports = {
  default: common,
};
