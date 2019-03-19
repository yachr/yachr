import { ICucumberReport } from './models/cucumber-report';
import * as fs from 'fs';


export class CucumberJsonReportReader {

  public readReport(filePath: string): ICucumberReport[] {
    const report = <ICucumberReport[]>JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(report[0].name);
    return report;
  }
}
