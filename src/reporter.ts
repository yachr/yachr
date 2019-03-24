import * as fs from 'fs';
import * as Handlebars from 'handlebars';

import { CucumberReportSummary } from './models/cucumberReportSummary';
import { ICucumberResult } from './models/cucumberResult';
import { HtmlModel } from './models/htmlModel';
import { ReportOptions } from './models/reportOptions';
import { ReportAggregator } from './reportAggregator';

export class Reporter {
  public generate(options: ReportOptions): void {
    options = this.populateDefaultOptionsIfMissing(options);

    const results = this.parseJsonFile(options.jsonFile);

    const aggregator = new ReportAggregator();

    const data = <HtmlModel> {
      cucumberReportSummary: aggregator.getSummaryForSuite(results),
      cucumberResult: results
    };

    if (!options.htmlTemplate) {
      throw('htmlTemplate not supplied in ReportOptions');
    }

    let reportTemplate: string;
    try {
      reportTemplate = fs.readFileSync(options.htmlTemplate, 'utf8');
    } catch (err) {
      throw(`Error reading htmlTemplate: ${err}`);
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

  /** Used by generate to add in any default options that need to overwrite empty parameters */
  private populateDefaultOptionsIfMissing(options: ReportOptions): ReportOptions {
    const defaultOptions = <ReportOptions> {
      htmlTemplate: __dirname + '/templates/standard.html'
    };

    return {...defaultOptions, ... options};
  }

  public parseJsonFile(resultsFile: string): ICucumberResult[] {
    let results: ICucumberResult[];
    let input: string;
    try {
      return JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
    } catch (err) {
      console.error('Error reading file: ' + resultsFile);
      throw (err);
    }
  }
}
