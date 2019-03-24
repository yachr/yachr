import * as fs from 'fs';
import * as Handlebars from 'handlebars';

import { CucumberReportSummary } from './models/cucumberReportSummary';
import { ICucumberResult } from './models/cucumberResult';
import { IHtmlModel } from './models/htmlModel';
import { IReportOptions } from './models/reportOptions';
import { ReportAggregator } from './reportAggregator';

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

    const data = <IHtmlModel> {
      cucumberReportSummary: aggregator.getSummaryForSuite(results),
      cucumberResult: results
    };

    if (!options.htmlTemplate) {
      throw new Error('htmlTemplate not supplied in ReportOptions');
    }

    let reportTemplate: string;
    try {
      reportTemplate = fs.readFileSync(options.htmlTemplate, 'utf8');
    } catch (err) {
      throw new Error(`Error reading htmlTemplate: ${err}`);
    }

    const template = Handlebars.compile(reportTemplate);

    // Gross work around because the template engine seems to reject
    // the work undefined as a property.
    Handlebars.registerHelper('undef', (suiteSummary: CucumberReportSummary): number =>
      suiteSummary.undefined
    );

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
  public parseJsonFile(resultsFile: string): ICucumberResult[] {
    try {
      return <ICucumberResult[]> JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
    } catch (err) {
      console.error('Error reading file: ' + resultsFile);
      throw (err);
    }
  }

  /**
   * Used by generate to add in any default options that need to overwrite empty parameters
   * @param options The options as passed in by the user
   */
  public populateDefaultOptionsIfMissing(options: IReportOptions): IReportOptions {
    const defaultOptions = <IReportOptions> {
      htmlTemplate: __dirname + '/templates/standard.html'
    };

    return {...defaultOptions, ... options};
  }
}
