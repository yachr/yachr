import { CucumberReportSummary } from './cucumberReportSummary';

/**
 * Aggregated summary of a single Feature.
 * Contains summary of each Scenario that belongs to this
 * feature
 */
export interface IFeatureSummary {
  scenarios: CucumberReportSummary[];
  featureSummary: CucumberReportSummary;
  featureName: string;
}
