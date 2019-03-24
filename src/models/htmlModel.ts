import { ICucumberResult } from './cucumberResult';
import { ISuiteSummary } from './suiteSummary';

export interface HtmlModel {
  cucumberReportSummary: ISuiteSummary;
  cucumberResult: ICucumberResult[];
}
