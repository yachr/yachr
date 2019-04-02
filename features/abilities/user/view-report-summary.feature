  Ability: View report summary

  As a user
  I would like to see the summary of features and scenarios in my project
  So that I can gauge my project's health and progress.

  Scenario: Feature summary
    Given a passing step
      | Feature     | Scenario     | Step   | Step Status |
      | Feature One | Scenario One | Step 1 | passed      |
    When I run yachr agaist it
    Then a summary showing one passing feature and one passing scenario
