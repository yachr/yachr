import { IResult } from './result';
export interface IStep {
  keyword: string
  name: string
  line: number
  match: {
    location: string
  }
  result: IResult
}
