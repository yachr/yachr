import { CucumberReportSummary } from './cucumberReportSummary';
import { IFeatureSummary } from './featureSummary';

export interface ISuiteSummary {
  features: IFeatureSummary[];
  suiteSummary: CucumberReportSummary;
}
