"""
Referencing current branch in github readme.md[1]
This pre-commit hook[2] updates the README.md file's
Travis badge with the current branch. Gist at[4].
[1] http://stackoverflow.com/questions/18673694/referencing-current-branch-in-github-readme-md
[2] http://www.git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
[3] https://docs.travis-ci.com/user/status-images/
[4] https://gist.github.com/dandye/dfe0870a6a1151c89ed9
"""
import subprocess

# Define the replacemenr function
def replace_status_in_readme(orig_str, new_str):
  readme_lines=open("README.md").readlines()
  with open("README.md", "w") as fh:
      for line in readme_lines:
          if orig_str in line and new_str != line:
              print ("Replacing:\n\t{line}\nwith:\n\t{new_str}".format(
                    line=line,
                    new_str=new_str))
              fh.write(new_str)
          else:
              fh.write(line)


# Hard-Coded for your repo (ToDo: get from remote?)
GITHUB_USER="yachr"
REPO="yachr"

print ("Starting pre-commit hook...")

BRANCH=subprocess.check_output(["git",
                                "rev-parse",
                                "--abbrev-ref",
                                "HEAD"]).strip()

# String with hard-coded values
# See Embedding Status Images[3] for alternate formats (private repos, svg, etc)

# [![Build Status]
# (https://travis-ci.org/yachr/yachr.svg?branch=develop)]
# (https://travis-ci.org/yachr/yachr/branches)

# Output String with Variable substitution
travis="[![Build Status]" \
      "(https://travis-ci.org/{GITHUB_USER}/{REPO}.svg?branch={BRANCH})]" \
      "(https://travis-ci.org/{GITHUB_USER}/{REPO}/branches)".format(
           BRANCH=BRANCH.decode("utf-8"), #Decode the bytes to a string to avoid b being inserted before the branch
           GITHUB_USER=GITHUB_USER,
           REPO=REPO)

replace_status_in_readme("[![Build Status]", travis)


#  Update the Coverage Status branch as well
# [![Coverage Status]
# (https://coveralls.io/repos/github/yachr/yachr/badge.svg?branch=develop)]
# (https://coveralls.io/github/yachr/yachr?branch=develop)

coveralls = "[![Coverage Status]" \
            "(https://coveralls.io/repos/github/{GITHUB_USER}/{REPO}/badge.svg?branch={BRANCH})]" \
            "(https://coveralls.io/github/{GITHUB_USER}/{REPO}?branch={BRANCH})".format(
              BRANCH=BRANCH.decode("utf-8"),
              GITHUB_USER=GITHUB_USER,
              REPO=REPO
            )

replace_status_in_readme("[![Coverage Status]", travis)

subprocess.check_output(["git", "add", "README.md" ])

print ("pre-commit hook complete.")
