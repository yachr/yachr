# YACHR
[![Build Status](https://travis-ci.org/yachr/yachr.svg?branch=develop)](https://travis-ci.org/yachr/yachr/branches)

Yet another cucumber html reporter is a simple html reporter that runs off the standard json file produced by cucumberjs.

This reporter targets cucumberjs 3.

# How to use

Run yachr, and supply it the location of your `report.json` file produced after running cucumberjs.


# Contribute

<details>
<summary>
Hack on `yachr`
</summary>

Clone the repo
Run `npm install`
Hack away.

`sampleUsageFile-typescript.ts` gets transpiled into the dist folder when `npm build` is run, this is useful for checking how it runs with node:

From the root:
`node dist/sampleUsageFile-typescript.js`

Should produced `dist/samples/report.html`

# CI
yachr is monitored by Travis-ci. when a change is detected Travis-ci will pull the repo and execute `npm run ci`

# Pre-commit hooks
To keep the build tags aligned to each branch, we're using this pre-commit setup in git:
https://gist.github.com/DesHorsley/6b258970c14bffa5cd423762b66c8355

When the readme is commited, the tag will be updated to reflect the current branch.
<details>