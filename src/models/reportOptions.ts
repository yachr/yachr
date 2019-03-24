
/**
 * Defines the options that can be provided to the YACHR
 * Cucumber report generator
 */
export interface IReportOptions {
  /** HTML file output path
   * @Example
   * `./e2e-reports/report.html`
   */
  output: string;

  /** Path to Cucumber file in JSON format */
  jsonFile: string;

  /**
   * Path to the custom template to use
   * @description A custom html template can be supplied. Templates use https://handlebarsjs.com/
   */
  htmlTemplate?: string;
}
