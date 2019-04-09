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
  description?: string; // TODO: TH where did this come from?
  tags: ITag[];

  type: string;
  steps: IStep[];
}
