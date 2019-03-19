import { IStep } from './step';
import { ITag } from './tag';
export class IElement {
  keyword: string
  id: string
  name: string
  line: number
  description: string
  tags: ITag[]

  type: string
  steps: IStep[]
}
