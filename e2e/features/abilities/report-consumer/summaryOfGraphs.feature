Ability: See a summary of each graph

  We want to display a graph for both the Features and the Scenarios
  The graph titles should help easily identify what each graph is, and summerise the total number of tests

  Scenario:
    Given Lina is viewing a cucumber report with:
      | 1 Feature  |
      | 2 Scenarios |
    Then Lina should see the following titles over the bar graphs
      | Feature Summary (1 Total)  |
      | Scenario Summary (2 Total) |
