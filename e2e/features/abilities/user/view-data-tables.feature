Ability: View data tables in report

  Scenario: View data table
    Given Virginia has a step has a data table like the following:
      | A heading                            |
      | a row                                |
      | or two                               |
    Then the report Virginia generates report should display the data table
