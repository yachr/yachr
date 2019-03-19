import { CucumberReportSummary } from './models/cucumber-report-summary';
import { ICucumberReport } from './models/cucumber-report';
import { IStep } from './models/step';
import { IElement } from './models/element';
export class ReportAggregator {

  public getSummaryForSuite(suite: ICucumberReport[]): CucumberReportSummary {
    const suiteSummary = new CucumberReportSummary();

    suite.forEach(report => {
      const reportSummary = this.getSummaryForReport(report);
      suiteSummary.aggregateChildSummary(reportSummary);
    })

    return suiteSummary;
  }


  public getSummaryForReport(report: ICucumberReport): CucumberReportSummary {
    const reportSummary = new CucumberReportSummary();

    report.elements.forEach(e => {
      const elementSummary = this.getSummaryForElement(e);
      reportSummary.aggregateChildSummary(elementSummary);
    })

    return reportSummary;
  }

  public getSummaryForElement(element: IElement): CucumberReportSummary {
    const elementSummary = new CucumberReportSummary();

    // Aggregate steps
    element.steps.forEach( s => {
      const stepSummary = this.summariseStep(s);
      elementSummary.aggregateChildSummary(stepSummary);
    });

    return elementSummary;
  }

  private summariseStep(step: IStep): CucumberReportSummary {
    const stepSummary = new CucumberReportSummary();

    if(step.result) {
      stepSummary.updateFromReportResult(step.result);
    }

    return stepSummary;
  }
}
