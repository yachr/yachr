import { ICucumberReport } from './models/cucumber-report';
import * as fs from 'fs';


export class CucumberJsonReportReader {

  public readReport(filePath: string): ICucumberReport[] {
    const jsonString = fs.readFileSync(filePath, 'utf8');
    return this.parseJsonString(jsonString);
  }

  public parseJsonString(jsonString: string) {
    const report = <ICucumberReport[]>JSON.parse(jsonString);
    return report;
  }
}
