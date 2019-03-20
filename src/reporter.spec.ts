import { Reporter } from './reporter';
import { expect } from 'chai';
import { } from 'mocha';

describe("reporter", () => {
  let reporter: Reporter;
  beforeEach(() => {
    reporter = new Reporter();
  });

  it("should parse a well formed json file", () => {
    const results = reporter.parseJsonFile('src/samples/results-empty.json');

    expect(results).to.deep.equal([]);
  });

  it('should handle bad file paths', () => {
    expect(
      () => { reporter.parseJsonFile('') }
      , `Didn't throw exception with broken file path.`
    ).to.throw('ENOENT: no such file or directory, open');
  });

  it('should reject malformed json', () => {
    expect(
      () => { reporter.parseJsonFile('src/samples/results-malformed.json') }
      , `parseJsonFile should throw an exception if the json is malformed`
    ).to.throw();
  });
});
