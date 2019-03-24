import { IFeatureSummary } from "./featureSummary";
import { CucumberReportSummary } from "./cucumberReportSummary";

export interface ISuiteSummary {
  features: IFeatureSummary[];
  suiteSummary: CucumberReportSummary;
}
