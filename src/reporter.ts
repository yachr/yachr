import { ReportOptions } from "./models/reportOptions";
import * as fs from 'fs';
import { ICucumberResult } from "./models/cucumber-result";
import { ReportAggregator } from "./report-aggregator";

export class Reporter {
  generate(options: ReportOptions) {
    const results = this.parseJsonFile(options.jsonFile);

    const aggregator = new ReportAggregator();

    const features = aggregator.getSummaryForFeature(results[0]);
  }

  public parseJsonFile(resultsFile: string): ICucumberResult[] {
    let results: ICucumberResult[];
    let input: string;
    try {
      return JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
    } catch (err) {
      console.log('Error reading file: ' + resultsFile);
      throw (err);
    }
  }
}
