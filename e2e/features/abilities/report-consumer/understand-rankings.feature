Ability: Understand how features and scenarios are given a status

  As a report reader
  I wan't to understand how a scenario or feature gets assigned its status
  So I can better understand the stats on the report

  Scenario: View description of statuses
    Given Lina is viewing a cucumber report
    Then Lina should be able to see a legend explaining the status
