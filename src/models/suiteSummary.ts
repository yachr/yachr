import { CucumberReportSummary } from './cucumberReportSummary';
import { IFeatureSummary } from './featureSummary';

/**
 * An aggregation summary of all Features in the test suite.
 * Includes a summary of each feature included in the suite
 */
export interface ISuiteSummary {
  features: IFeatureSummary[];
  suiteSummary: CucumberReportSummary;
}
