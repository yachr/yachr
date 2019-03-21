import { CucumberReportSummary } from "./cucumber-report-summary";

export interface IFeatureSummary {
  scenarios: CucumberReportSummary[],
  featureSummary?: CucumberReportSummary,
  featureName: string
}
