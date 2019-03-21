import { IFeatureSummary } from "./featureSummary";
import { CucumberReportSummary } from "./cucumber-report-summary";

export interface ISuiteSummary {
  features: IFeatureSummary[],
  suiteSummary: CucumberReportSummary
}
