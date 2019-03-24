import { IStep } from './step';
import { ITag } from './tag';
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
