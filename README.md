# YACHR
[![Build Status](https://travis-ci.org/yachr/yachr.svg?branch=CommitHooks)](https://travis-ci.org/yachr/yachr/branches)
Yet another cucumber html reporter is a simple html reporter that runs off the standard json file produced by cucumberjs.

This reporter targets cucumberjs 3.

# How to use

Install yachr either as a global or dev dependency to your project:

```bash
npm install yachr --global
```

To run yachr stand alone, create a js file (eg `runReport.js`) with the following contents:

```javascript
var yachr = require("yachr");
var reporter = new yachr.Reporter();

reporter.generate({
  jsonFile: 'e2e-reports/results.json', // Location of the output from running cucumberjs
  output: 'e2e-reports/yachr.html'
});
```

Then execute it with node:

```bash
node ./runReport.js
```

This script can then be used through your projects npm scripts:

```json
{
  "scripts": [
    ...,
    "cucumber": "...",
    "postCucumber": "node ./runReport"
    ...
  ]
}
```

Or if you're using it with a library like protractor, it can be included in the tear down script directly:

In `protractor.conf.js`
```javascript
exports.config = {
  ...,
  onCleanUp: () => {
    var yachr = require("yachr");
    var reporter = new yachr.Reporter();

    reporter.generate({
      jsonFile: 'e2e-reports/results.json', // Location of the output from running cucumberjs
      output: 'e2e-reports/yachr.html'
    });
  }
  ...
}
```
# Custom Templates
yachr makes use of [handlebarsjs](https://handlebarsjs.com/) for its templating. If there is a particular look you are going for, you can include a custom html file in your repo, and pass it in as a parameter.

Feel free to contribute it back to the project if you think the community could benefit from it. :wink:

A good place to start is looking at the [default template](src/templates/standard.html)

The data model supplied to the template can be seen [starting here](src/models/htmlModel.ts)

# Contribute

<details>
<summary>
Hack on `yachr`
</summary>

Clone the repo
Run `npm install`

Hack away.

[sampleUsageFile.ts](src\sampleUsageFile.ts) gets transpiled into the dist folder when `npm build` is run, this is useful for checking how it runs with node:

From the root:
`node dist/src/sampleUsageFile.js`

Should produced `dist/samples/report.html`

# CI
yachr is monitored by Travis-ci. when a change is detected Travis-ci will pull the repo and execute `npm run ci`. Travis will run `ci` before accepting a pull request.

# Pre-commit hooks
To keep the build tags aligned to each branch, we're using this pre-commit setup in git:
https://gist.github.com/DesHorsley/6b258970c14bffa5cd423762b66c8355

When the readme is committed, the tag will be updated to reflect the current branch.
<details>
