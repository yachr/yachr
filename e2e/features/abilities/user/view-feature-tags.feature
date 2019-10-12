@GH-30
Ability: View tags in report
  As a user who makes use of tags
  I want to see any tags defined in the gherkin present in the report

  @GH-30
  Scenario: View Feature tag
    Given Ira has results from a cucumber test containing the tag '@GH-30' against the feature 'View Feature tag'
    When Ira runs yachr against the result
    Then Ira will see the tag '@GH-30' in the tile bar of the 'View Feature tag' feature
