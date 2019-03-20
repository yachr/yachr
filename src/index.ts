'use strict';

import { ReportOptions } from "./models/reportOptions";
import { Reporter } from "./reporter";


export function generate(options: ReportOptions) {
  const reporter = new Reporter();
  return reporter.generate(options);
}
