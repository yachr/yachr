export enum ResultStatus {
  passed = 'passed',
  failed = 'failed',
  undefined = 'undefined',
  pending = 'pending',
  ambiguous = 'ambiguous',
}

export interface IResult {
  status: string;
  duration: number;
  error_message: string;
}
