# YACHR
[![Build Status](https://travis-ci.org/yachr/yachr.svg?branch=develop)](https://travis-ci.org/yachr/yachr/branches)

Yet another cucumber html reporter is a simple html reporter than runs off the standard json file produced by cucumberjs.

This reporter targets cucumberjs 3.

# How to use

Ran yatch, and supply it the location of your report.json file produce after running cucumberjs.

# CI
yachr is monitored by Travis-ci. when a change is detected Travis-ci will pull the repo and execute `npm run ci`

# Pre-commit hooks
To keep the build tags aligned to each branch, we're using this pre-commit setup in git:
https://gist.github.com/DesHorsley/6b258970c14bffa5cd423762b66c8355

When the readme is commited, the tag will be updated to reflect the current branch.