
export interface ReportOptions {
  /** HTML file output path
   * @Example
   * `./e2e-reports/report.html`
  */
  output: string,

  /** Path to Cucumber file in JSON format */
  jsonFile: string,
}
