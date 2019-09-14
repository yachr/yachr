import * as fs from 'fs';
import * as Handlebars from 'handlebars';

import { FeatureSuiteSummary } from './models/aggregator/featureSuiteSummary';
import { FeatureSummary } from './models/aggregator/featureSummary';
import { ScenarioSuiteSummary } from './models/aggregator/scenarioSuiteSummary';
import { IHtmlModel } from './models/htmlModel';
import { ICucumberFeature } from './models/reporter/cucumberFeature';
import { ICucumberFeatureSuite } from './models/reporter/cucumberFeatureSuite';
import { IStep } from './models/reporter/step';
import { IReportOptions } from './models/reportOptions';
import { ScenarioSummary } from './models/aggregator/scenarioSummary';
import { ReportAggregator } from './reportAggregator';
import { ResultStatus } from './models/reporter/resultStatus';

/**
 * The main YACHR Cucumber HTML Report generator.
 * Provides an API to read in a Cucumber Test Report,
 * and generate a static HTML page which summarises the report
 * into a dashboard
 */
export class Reporter {

  /**
   * Generates the HTML Report summary for the Cucumber Test Report.
   * @param options Options to configure how the reporter will generate the HTML report
   */
  public generate(options: IReportOptions): void {
    options = this.populateDefaultOptionsIfMissing(options);

    const results = this.parseJsonFile(options.jsonFile);

    const aggregator = new ReportAggregator();

    console.debug(results);

    const data = <IHtmlModel> {
      cucumberReportSummary: aggregator.getSummaryForSuite(results),
      cucumberResult: results
    };

    if (!options.htmlTemplate) {
      throw new Error('htmlTemplate not supplied in ReportOptions');
    }

    let reportTemplate: string;
    let featureTemplate: string;
    let scenarioTemplate: string;
    try {
      reportTemplate = fs.readFileSync(options.htmlTemplate, 'utf8');
      featureTemplate = fs.readFileSync('src/templates/feature.html', 'utf8');
      scenarioTemplate = fs.readFileSync('src/templates/scenario.html', 'utf8');
    } catch (err) {
      throw new Error(`Error reading htmlTemplate: ${err}`);
    }

    const template = Handlebars.compile(reportTemplate);

    // Gross work around because the template engine seems to reject
    // the work undefined as a property.
    Handlebars.registerHelper('featureUndef', (featureSummary: FeatureSuiteSummary): number =>
      featureSummary.undefined
    );

    Handlebars.registerHelper('scenarioUndef', (suiteSummary: ScenarioSuiteSummary): number =>
      suiteSummary.undefined
    );

    Handlebars.registerHelper('stepUndef', (scenarioSummary: ScenarioSummary): number =>
      scenarioSummary.undefined
    );
    // var featureObject = document.createElement('html');
    // featureObject.innerHTML = featureTemplate;

    Handlebars.registerPartial({
      feature: Handlebars.compile(featureTemplate),
    });

    Handlebars.registerPartial({
      scenario: Handlebars.compile(scenarioTemplate),
    });

    Handlebars.registerHelper('getFeatureCss', (featureSummary: FeatureSummary) => {

      if (featureSummary.failed > 0) {
        return 'failing-feature';
      }

      if (featureSummary.ambiguous > 0) {
        return 'ambiguous-feature';
      }

      if (featureSummary.undefined > 0) {
        return 'undefined-feature';
      }

      if (featureSummary.pending > 0) {
        return 'pending-feature';
      }

      if (featureSummary.passed === featureSummary.total) {
        return 'passing-feature';
      }
    });

    Handlebars.registerHelper('getStepCss', (step: IStep) => {

      if (step.result.status === ResultStatus.failed) {
        return 'failing-step';
      }

      if (step.result.status === ResultStatus.ambiguous) {
        return 'ambiguous-step';
      }

      if (step.result.status === ResultStatus.undefined) {
        return 'undefined-step';
      }

      if (step.result.status === ResultStatus.pending) {
        return 'pending-step';
      }

      if (step.result.status === ResultStatus.skipped) {
        return 'pending-step';
      }

      if (step.result.status === ResultStatus.passed) {
        return 'passing-step';
      }
    });

    const htmlReport = template(data);

    try {
      fs.writeFileSync(options.output, htmlReport, 'utf8');
    } catch (err) {
      console.error(`Error writing report to file: ${err}`);
    }
  }

  /**
   * Parses a JSON file (at the given file path) into the data model for
   * the Cucumber Report. This report can then be used with strong typing
   * when accessing components of the report
   * @param resultsFile The path to the Cucumber Test Results file
   */
  public parseJsonFile(resultsFile: string): ICucumberFeatureSuite {
    try {
      const results = fs.readFileSync(resultsFile, 'utf8');
      return this.parseJsonString(results);
    } catch (err) {
      console.error('Error reading file: ' + resultsFile);
      throw (err);
    }
  }

  /**
   * Parses a JSON String and returns a strongly typed data model
   * reflecting the Cucumber Test Report data structure
   * @param results An array of Cucumber Features from the Test Report
   */
  public parseJsonString(results: string): ICucumberFeatureSuite {
    const features: ICucumberFeature[] = <ICucumberFeature[]> JSON.parse(results);
    return { features };
  }

  /**
   * Used by generate to add in any default options that need to overwrite empty parameters
   * @param options The options as passed in by the user
   */
  public populateDefaultOptionsIfMissing(options: IReportOptions): IReportOptions {
    const defaultOptions = <IReportOptions> {
      htmlTemplate: __dirname + '/templates/standard.html'
    };

    return { ...defaultOptions, ...options };
  }
}
