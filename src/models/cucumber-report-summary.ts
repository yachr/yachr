import { ResultStatus, IResult } from "./result";

// Can be aggregated at the Feature level, and then aggregated at the report level

export class CucumberReportSummary {

  passed: number = 0
  failed: number = 0
  undefined: number = 0
  pending: number = 0
  ambiguous: number = 0

  // Catch all for if we haven't mapped a cucumber report status
  unknown: number = 0

  get total(): number {
    return this.passed + this.failed + this.undefined +
    this.pending + this.ambiguous + this.unknown;
  }

  totalDuration: number = 0

  aggregateChildSummary(child: CucumberReportSummary) {
    this.totalDuration += child.totalDuration;

    this.passed += child.passed;
    this.failed += child.failed;
    this.undefined += child.undefined;
    this.pending += child.pending;
    this.ambiguous += child.ambiguous;

    this.unknown += child.unknown;
  }

  updateFromReportResult(result: IResult) {
    this.totalDuration += result.duration;

      // Switch case on status
      switch (result.status) {
        case ResultStatus.passed: this.passed++; break;
        case ResultStatus.failed: this.failed++; break;
        case ResultStatus.undefined: this.undefined++; break;
        case ResultStatus.pending: this.pending++; break;
        case ResultStatus.ambiguous: this.ambiguous++; break;
        default: this.unknown++;
      }
  }
}
