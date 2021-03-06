import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as marked from 'marked';

import { FeatureSummary } from './models/aggregator/featureSummary';
import { ScenarioSummary } from './models/aggregator/scenarioSummary';
import { IHtmlModel } from './models/htmlModel';
import { ICucumberFeature } from './models/reporter/cucumberFeature';
import { ICucumberFeatureSuite } from './models/reporter/cucumberFeatureSuite';
import { ResultStatus } from './models/reporter/resultStatus';
import { IStep } from './models/reporter/step';
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

    const rawResults = this.parseJsonFile(options.jsonFile);

    // if a filter has been passed in, filter out the results
    const results = this.filterResults(rawResults, options);

    const aggregator = new ReportAggregator();

    const data = <IHtmlModel> {
      cucumberReportSummary: aggregator.getSummaryForSuite(results),
      cucumberResult: results,
      generateTime: (new Date()).toLocaleString()
    };

    if (!options.htmlTemplate) {
      throw new Error('htmlTemplate not supplied in ReportOptions');
    }

    if (!options.featureTemplate) {
      throw new Error('featureTemplate not supplied in ReportOptions');
    }

    if (!options.scenarioTemplate) {
      throw new Error('scenarioTemplate not supplied in ReportOptions');
    }

    let reportTemplate: string;
    let featureTemplate: string;
    let scenarioTemplate: string;

    try {
      reportTemplate = fs.readFileSync(options.htmlTemplate, 'utf8');
      featureTemplate = fs.readFileSync(options.featureTemplate, 'utf8');
      scenarioTemplate = fs.readFileSync(options.scenarioTemplate, 'utf8');
    } catch (err) {
      throw new Error(`Error reading htmlTemplate: ${err}`);
    }

    const template = Handlebars.compile(reportTemplate);

    // Gross work around because the template engine seems to reject
    // the work undefined as a property.
    Handlebars.registerHelper('countOf', (obj, property: 'string'): number =>
      (obj)[property] as number
    );

    Handlebars.registerPartial({
      feature: Handlebars.compile(featureTemplate),
    });

    Handlebars.registerPartial({
      scenario: Handlebars.compile(scenarioTemplate),
    });

    Handlebars.registerHelper('getFeatureCss', (featureSummary: FeatureSummary) =>
      this.getFeatureCss(featureSummary)
    );

    Handlebars.registerHelper('getScenarioCss', (scenarioSummary: ScenarioSummary) =>
      this.getScenarioCss(scenarioSummary));

    Handlebars.registerHelper('markdown2Html', (markdown: string) =>
      marked(markdown && markdown.trim() || '')
    );

    Handlebars.registerHelper('getStepCss', (step: IStep) => {

      switch (step.result.status) {
        case ResultStatus.failed:
          return 'failing-step';
        case ResultStatus.ambiguous:
          return 'ambiguous-step';
        case ResultStatus.undefined:
          return 'undefined-step';
        // Both pending and skipped will be styled the same
        case ResultStatus.pending:
        case ResultStatus.skipped:
          return 'pending-step';
        case ResultStatus.passed:
          return 'passing-step';
        default:
          return '';
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
   * Filters the features and scenario's based on tags
   */
  public filterResults(featureSuiteOrig: ICucumberFeatureSuite, options: IReportOptions): ICucumberFeatureSuite {
    // Don't modify the original suite
    const featureSuite = JSON.parse(JSON.stringify(featureSuiteOrig)) as ICucumberFeatureSuite;

    if (options.tags && options.tags.length) {
      const tags: string[] = (options.tags || '').split(',').map(t => t.trim());
      const includeTags = tags.filter(t => t.startsWith('@'));
      const excludeTags = tags.filter(t => t.startsWith('~')).map(t => t.substring(1)); // Drop the tilde

      let filteredFeatures = featureSuite.features.filter(f => {
        const x = (!includeTags.length || f.tags.some(t => includeTags.includes(t.name))) ;
        const y = (!excludeTags.length || !f.tags.some(t => excludeTags.includes(t.name)));
        return x && y;
      });

      filteredFeatures.forEach(f => f.elements = f.elements.filter(el => {
        const x = (!includeTags.length || el.tags.some(t => includeTags.includes(t.name)));
        const y = (!excludeTags.length || !el.tags.some(t => excludeTags.includes(t.name)));
        return x && y;
      }));

      filteredFeatures = filteredFeatures.filter(f => f.elements.length);

      return { features: filteredFeatures };
    }

    return featureSuite;
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
      featureTemplate: __dirname + '/templates/feature.html',
      htmlTemplate: __dirname + '/templates/standard.html',
      scenarioTemplate: __dirname + '/templates/scenario.html'
    };

    return { ...defaultOptions, ...options };
  }

  /**
   * Generates the cess for the feature block of html
   */
  public getFeatureCss(featureSummary: FeatureSummary): string {
    if (featureSummary.hasFailed) {
      return 'failing-feature';
    }

    if (featureSummary.hasAmbiguous) {
      return 'ambiguous-feature';
    }

    if (featureSummary.hasUndefined) {
      return 'undefined-feature';
    }

    if (featureSummary.hasPending) {
      return 'pending-feature';
    }

    if (featureSummary.isPassed) {
      return 'passing-feature';
    }

    return '';
  }

  /**
   * Returns the css for the scenario block
   */
  public getScenarioCss(scenarioSummary: ScenarioSummary): string {
    if (scenarioSummary.hasFailed) {
      return 'failing-scenario';
    }

    if (scenarioSummary.hasAmbiguous) {
      return 'ambiguous-scenario';
    }

    if (scenarioSummary.hasUndefined) {
      return 'undefined-scenario';
    }

    if (scenarioSummary.hasPending) {
      return 'pending-scenario';
    }

    if (scenarioSummary.isPassed) {
      return 'passing-scenario';
    }

    return '';
  }
}
