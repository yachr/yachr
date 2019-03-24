import { IResult, ResultStatus } from './result';

// Can be aggregated at the Feature level, and then aggregated at the report level

export class CucumberReportSummary {
  public passed: number = 0;
  public failed: number = 0;
  public undefined: number = 0;
  public pending: number = 0;
  public ambiguous: number = 0;

  // Catch all for if we haven't mapped a cucumber report status
  public unknown: number = 0;
  public totalDuration: number = 0;

  public scenarioName: string;

  constructor() {
    this.scenarioName = '';
  }

  /** All features */
  get total(): number {
    return this.passed + this.failed + this.undefined +
      this.pending + this.ambiguous + this.unknown;
  }

  get isFailed(): boolean { return this.failed > 0; }
  get isPassed(): boolean { return this.passed === this.total; }

  public aggregateChildSummary(child: CucumberReportSummary): void {
    this.totalDuration += child.totalDuration;

    this.passed += child.passed;
    this.failed += child.failed;
    this.undefined += child.undefined;
    this.pending += child.pending;
    this.ambiguous += child.ambiguous;

    this.unknown += child.unknown;
  }

  public updateFromReportResult(result: IResult): void {
    this.totalDuration += <number> (result.duration | 0);

    // Switch case on status
    switch (result.status) {
      case ResultStatus.passed: this.passed++; break;
      case ResultStatus.failed: this.failed++; break;
      case ResultStatus.undefined: this.undefined++; break;
      case ResultStatus.pending: this.pending++; break;
      case ResultStatus.ambiguous: this.ambiguous++; break;
      default: {
        this.unknown++;
        console.warn(`Unmapped result status for ${result.status}`);
      }
    }
  }
}
