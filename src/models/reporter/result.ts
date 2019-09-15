/**
 * Defines the result of a single Step
 * (e.g. GIVEN, WHEN, THEN)
 */
export interface IResult {
  status: string;
  duration: number;
  error_message?: string;
}
