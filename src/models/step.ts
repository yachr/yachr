import { IResult } from './result';

/**
 * Defines a Cucumber Test result of a single step in the Gherkin lifecycle
 * (GIVEN, WHEN, THEN)
 */
export interface IStep {
  keyword: string;
  name: string;
  line: number;
  match: {
    location: string;
  };
  result: IResult;
}
