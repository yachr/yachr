import { IStep } from './step';
import { ITag } from './tag';

// TODO: Rename the IElement class to align to what it IS,
// rather than the fact that it is named as such in the
// Cucumber JSON Report

/**
 * Defines the data model for a Scenario in a single Feature
 */
export interface IElement {
  keyword: string;
  id: string;
  name: string;
  line: number;
  description?: string; // TODO: TH where did this come from?
  tags: ITag[];

  type: string;
  steps: IStep[];
}
