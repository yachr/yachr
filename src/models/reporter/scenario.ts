import { IStep } from './step';
import { ITag } from './tag';

/**
 * Defines the data model for a Scenario in a single Feature
 */
export interface IScenario {
  keyword: string;
  id: string;
  name: string;
  line: number;

  /** Description can be missing if no free text was entered in Gherkin */
  description?: string;
  tags: ITag[];

  type: string;
  steps: IStep[];
}
