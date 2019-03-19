import { CucumberJsonReportReader } from './../src/cucumber-json-report-reader';
import { ICucumberReport } from './../src/models/cucumber-report';
import { expect } from 'chai';

describe('cucumber-json-report-reader', () => {

  it('should read a json file to a strongly typed object', () => {
      const jsonFile = 'samples/cucumber-report.json';
      const reader = new CucumberJsonReportReader();
      const report = reader.readReport(jsonFile);

      expect(report).to.have.length(1)
      expect(report[0].name).to.be.equal('One passing scenario, one failing scenario')
  });

  it('should fail at reading a nonexistent json file', () => {
    const jsonFile = 'samples/some-nonexistent-cucumber-report.json';
    const reader = new CucumberJsonReportReader();

    expect(() => reader.readReport(jsonFile)).to.throw();
  });
});
