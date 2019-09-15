import { IResult } from './result';

/**
 * Defines a Cucumber Test result of a single step in the Gherkin lifecycle
 * (GIVEN, WHEN, THEN)
 */
export interface IStep {
  keyword: string;
  /** Hidden steps don't have a name */
  name?: string;
  /** Hidden steps don't have a line */
  line?: number;
  hidden?: boolean;
  match: {
    location: string;
  };
  result: IResult;
}
