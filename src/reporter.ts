import { ReportOptions } from "./models/reportOptions";
import * as fs from 'fs';
import { ICucumberResult } from "./models/cucumber-result";
import { ReportAggregator } from "./report-aggregator";
import * as Handlebars from "handlebars";
import { HtmlModel } from "./models/htmlModel";
import { CucumberReportSummary } from "./models/cucumber-report-summary";

export class Reporter {
  generate(options: ReportOptions) {
    options = this.populateDefaultOptionsIfMissing(options);

    const results = this.parseJsonFile(options.jsonFile);

    const aggregator = new ReportAggregator();

    const data = <HtmlModel>{
      cucumberReportSummary: aggregator.getSummaryForSuite(results),
      cucumberResult: results
    };

    if(!options.htmlTemplate) {
      throw('htmlTemplate not supplied in ReportOptions');
    }

    let reportTemplate: string;
    try {
      reportTemplate = fs.readFileSync(options.htmlTemplate, 'utf8');
    } catch(err) {
      throw(`Error reading htmlTemplate: ${err}`);

    }

    const template = Handlebars.compile(reportTemplate);

    // Gross work around because the template engine seems to reject
    // the work undefined as a property.
    Handlebars.registerHelper('undef', function(suiteSummary: CucumberReportSummary) {
      return suiteSummary.undefined;
    });

    const htmlReport = template(data);

    try {
      fs.writeFileSync(options.output, htmlReport, 'utf8');
    } catch(err) {
      console.log(`Error writing report to file: ${err}`);
    }
  }

  /** Used by generate to add in any default options that need to overwrite empty parameters */
  populateDefaultOptionsIfMissing(options: ReportOptions) {
    const defaultOptions = <ReportOptions>{
      htmlTemplate: './src/templates/standard.html'
    };

    return {...defaultOptions, ... options};
  }


  public parseJsonFile(resultsFile: string): ICucumberResult[] {
    let results: ICucumberResult[];
    let input: string;
    try {
      return JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
    } catch (err) {
      console.log('Error reading file: ' + resultsFile);
      throw (err);
    }
  }
}