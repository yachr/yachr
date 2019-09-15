
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

  /** The path to the custom feature template
   * @description the feature template is a partial used by handlebars, the
   * default system template makes use of the scenario partial too.
   */
  featureTemplate?: string;

  /**
   * The path to the custom scenario template
   * @description The scenario template is used with the display of each feature
   */
  scenarioTemplate?: string;
}
