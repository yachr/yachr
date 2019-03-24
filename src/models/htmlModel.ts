import { ICucumberFeatureSuite } from './cucumberFeatureSuite';
import { ISuiteSummary } from './suiteSummary';

/**
 * Defines the data model for what will be sent to the HTML
 * report template for rendering
 */
export interface IHtmlModel {
  cucumberReportSummary: ISuiteSummary;
  cucumberResult: ICucumberFeatureSuite;
}
