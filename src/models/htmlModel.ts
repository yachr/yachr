import { ICucumberResult } from "./cucumber-result";
import { ISuiteSummary } from "./suiteSummary";

export interface HtmlModel {
  cucumberReportSummary: ISuiteSummary,
  cucumberResult: ICucumberResult[]
}
