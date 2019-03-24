import { CucumberReportSummary } from './cucumberReportSummary';

export interface IFeatureSummary {
  scenarios: CucumberReportSummary[];
  featureSummary: CucumberReportSummary;
  featureName: string;
}
