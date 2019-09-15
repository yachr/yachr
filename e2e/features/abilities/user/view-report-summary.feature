Ability: View report summary

  As a user
  I would like to see the summary of features and scenarios in my project
  So that I can gauge my project's health and progress.

  The status of a Scenario behaves like a hierarchy that rolls up.
  The scenario status will be the 'worst' status of its child steps as follows:
  ambiguous, failed, undefined, pending, passed
  Although a step can be skipped, a scneario cannot.

  Ambiguous is the worst because it is similar to a compile erorr. There are
  two or more implementations that match one step, and the test simply can't be run.

  Failed is next because a step has been implemented, and failed, which is unexpected.

  Undefined is then next, because no implementation has been put together.

  Pending is where the implementation exists, but returns the string pending.

  Finally, if all steps pass, then the scenario passes.

  Scenario: All passing
    Given a passing scenario
      | Feature     | Scenario     | Step   | Step Status |
      | Feature One | Scenario One | Step 1 | passed      |
      | Feature One | Scenario One | Step 2 | passed      |
      | Feature One | Scenario One | Step 3 | passed      |
    When I run yachr against it
    Then a summary showing one passing feature and one passing scenario

  Scenario: Handle mixed states
    Given the following scenarios
      | Feature     | Scenario     | Step   | Step Status |
      | Feature One | Scenario One | Step 1 | passed      |
      | Feature One | Scenario One | Step 2 | ambiguous   |

      | Feature Two | Scenario One | Step 1 | passed |
      | Feature Two | Scenario One | Step 2 | failed |

      | Feature Three | Scenario One | Step 1 | passed  |
      | Feature Three | Scenario One | Step 2 | pending |

      | Feature Four | Scenario One | Step 1 | undefined |

    When I run yachr against it
    Then I will see the following in the summary
      | Feature       | Status    |
      | Feature One   | ambiguous |
      | Feature Two   | failed    |
      | Feature three | pending   |
      | Feature four  | undefined |
