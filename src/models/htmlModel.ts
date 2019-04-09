import { SuiteSummary } from './aggregator/suiteSummary';
import { ICucumberFeatureSuite } from './reporter/cucumberFeatureSuite';

/**
 * Defines the data model for what will be sent to the HTML
 * report template for rendering
 */
export interface IHtmlModel {

  /**
   * The aggregated summary of the Features of the Cucumber test report
   */
  cucumberReportSummary: SuiteSummary;

  /**
   * The raw data of the Cucumber test report
   * TODO: Des: Do we need this?
   */
  cucumberResult: ICucumberFeatureSuite;
}
