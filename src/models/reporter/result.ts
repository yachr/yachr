/**
 * Defines the result of a single Step
 * (e.g. GIVEN, WHEN, THEN)
 */
export interface IResult {
  status: string;
  duration: number; // TODO: Review if duration is an optional field
  error_message?: string;
}
