# YACHR
[![Build Status](https://travis-ci.org/yachr/yachr.svg?branch=GH-29)](https://travis-ci.org/yachr/yachr/branches)
[![Coverage Status](https://coveralls.io/repos/github/yachr/yachr/badge.svg?branch=develop)](https://coveralls.io/github/yachr/yachr?branch=develop)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
---
Note: This library is under development, there are several features outstanding.

Feel free to use it or trial it, pull requests and issues are welcome, and will be addressed as time allows.

---
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

# Sample Output
![Sample Image of Report](https://i.imgur.com/cDJ5VYk.png)

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

## Testing out changes to the html template
When making changes to the template its good to see those changes applied as you go.

One option to do this if you're using the templating system, is to get the unit tests to run as you make changes.

As a starting point, the 'should generate a report' test in the reporter.spec.ts will generate a basic looking report.

This can be run on its own by updating the test's `it` to use the only function:

```
it.only('should generate a report', () => {
```

Don't commit this line though!

One last step is to comment out the code that cleans up the test and removes the generated html. This should be the last line of the test, and has a helpful comment to point it out for you.
# CI
yachr is monitored by Travis-ci. when a change is detected Travis-ci will pull the repo and execute `npm run ci`. Travis will run `ci` before accepting a pull request.

# Pre-commit hooks
To keep the build tags aligned to each branch, we're using this pre-commit setup in git.
When the readme is committed, the tag will be updated to reflect the current branch.

The commit hooks for this repo can be found under the `.githooks` folder. A
`setup.sh` script is provided for ease of setting up local developer environments
to use these commit hooks.

As new commit hooks are added, the `setup.sh` script should be maintained to ensure
that all hooks can be loaded as part of the onboarding process.

The `pre-commit` hook is configured to auto-load the current version of the `pre-commit.py`
python script. This will ensure that any changes made to the pre-commit script
are synchronised with the developer's environment.

It should be noted that because the pre-commit hook uses a python script, [python](https://www.python.org/downloads/) needs to be installed and accessible from the developer's PATH environment variable.

</details>
