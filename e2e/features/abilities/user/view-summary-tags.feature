@GH-30
Ability: View tags in report
  As a user who makes use of tags
  I want to see any tags defined in the gherkin present in the report

  @GH-30
  Scenario: View Scenario tag
    Given Jon has results from a cucumber test containing the tag '@GH-30' against the scenario 'View scenario tag'
    When Jon runs yachr against the result
    Then Jon will see the tag '@GH-30' in the title bar of the scenario 'View Scenario tag' in the generated report
