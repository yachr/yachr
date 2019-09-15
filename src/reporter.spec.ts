import { expect } from 'chai';
import * as fs from 'fs';
import { } from 'mocha';

import { IReportOptions } from './models/reportOptions';
import { Reporter } from './reporter';
import { FeatureSummary } from './models/aggregator/featureSummary';
import { ScenarioSummary } from './models/aggregator/scenarioSummary';

describe('reporter', () => {
  let reporter: Reporter;
  beforeEach(() => {
    reporter = new Reporter();
  });

  it('should parse a well formed json file', () => {
    const results = reporter.parseJsonFile('src/samples/results-empty.json');
    const expected = { features: [] };
    expect(results).to.deep.equal(expected);
  });

  it('should handle bad file paths', () => {
    expect(
      () => { reporter.parseJsonFile(''); }
      , `Didn't throw exception with broken file path.`
    ).to.throw('ENOENT: no such file or directory, open');
  });

  it('should reject malformed json', () => {
    expect(
      () => { reporter.parseJsonFile('src/samples/results-malformed.json'); }
      , 'parseJsonFile should throw an exception if the json is malformed'
    ).to.throw();
  });

  it('should generate a report', () => {
    const options: IReportOptions = {
      jsonFile: './src/samples/results.json',
      output: './src/samples/sample.html'
    };

    // File should not be there before the test is run
    // tslint:disable-next-line:no-unused-expression - This is just how Chai works
    expect(fs.existsSync(options.output), `Error: '${options.output}' existed before test ran`).to.be.false;

    reporter.generate(options);

    // Confirm the report has been created
    // tslint:disable-next-line:no-unused-expression - This is just how Chai works
    expect(fs.existsSync(options.output), `Error: test did not produce ${options.output}`).to.be.true;

    // Clean up test
    // Comment this out if you want to view the generated html
    fs.unlinkSync(options.output);
  });

  it('should update options with required defaults if the user does not supply them', () => {
    const options = <IReportOptions> { };

    const actual = reporter.populateDefaultOptionsIfMissing(options);

    // tslint:disable-next-line:no-unused-expression - This is just how Chai works
    expect(actual.htmlTemplate).to.exist;
  });

  it('populateDefaultOptionsIfMissing should not overwrite existing values', () => {
    const options = <IReportOptions> {
      htmlTemplate: 'templatePath',
      jsonFile: 'somepath'
    };

    const actual = reporter.populateDefaultOptionsIfMissing(options);

    expect(actual.jsonFile, 'Error: Supplied value has been dropped').to.equal(options.jsonFile);
    expect(actual.htmlTemplate, 'Error: supplied value overwritten by default').to.equal(options.htmlTemplate);
  });

  it('generates css for feature block', () => {
    let featureSummary = {
      hasFailed: true
    } as FeatureSummary;

    expect(reporter.getFeatureCss(featureSummary)).to.equal('failing-feature');

    featureSummary = {
      hasAmbiguous: true
    } as FeatureSummary;

    expect(reporter.getFeatureCss(featureSummary)).to.equal('ambiguous-feature');

    featureSummary = {
      hasUndefined:true
    } as FeatureSummary;

    expect(reporter.getFeatureCss(featureSummary)).to.equal('undefined-feature');

    featureSummary = {
      hasPending: true
    } as FeatureSummary;

    expect(reporter.getFeatureCss(featureSummary)).to.equal('pending-feature');

    featureSummary = {
      isPassed: true
    } as FeatureSummary;

    expect(reporter.getFeatureCss(featureSummary)).to.equal('passing-feature');

    featureSummary = {
    } as FeatureSummary;

    expect(reporter.getFeatureCss(featureSummary)).to.equal('');
  });

  it('generates css for Scenario block', () => {
    let scenarioSummary: ScenarioSummary = {
      hasFailed: true
    } as ScenarioSummary;

    expect(reporter.getScenarioCss(scenarioSummary)).to.equal('failing-scenario');

    scenarioSummary = {
      hasAmbiguous: true
    } as ScenarioSummary;

    expect(reporter.getScenarioCss(scenarioSummary)).to.equal('ambiguous-scenario');

    scenarioSummary = {
      hasUndefined: true
    } as ScenarioSummary;

    expect(reporter.getScenarioCss(scenarioSummary)).to.equal('undefined-scenario');

    scenarioSummary = {
      hasPending: true
    } as ScenarioSummary;

    expect(reporter.getScenarioCss(scenarioSummary)).to.equal('pending-scenario');

    scenarioSummary = {
      isPassed: true
    } as ScenarioSummary;

    expect(reporter.getScenarioCss(scenarioSummary)).to.equal('passing-scenario');

    scenarioSummary = {} as ScenarioSummary;
    expect(reporter.getScenarioCss(scenarioSummary)).to.equal('');

  });
});
