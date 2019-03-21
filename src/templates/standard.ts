export const ReportTemplate =`
<html>
<body>
  <h1>Specification Execution Results </h1>

  <table>
    <header>
        <thead>
          <td></td>
          <td>Passed</td>
          <td>Failed</td>
          <td>Undefined</td>
          <td>Pending</td>
          <td>Ambiguous</td>
          <td>Unknown</td>
          <td>Total</td>
        </thead>
    </header>
    <tr>
      <td>Steps</td>
      <td>{{ cucumberReportSummary.suiteSummary.passed }}</td>
      <td>{{ cucumberReportSummary.suiteSummary.failed }}</td>
      <td>{{ undef cucumberReportSummary.suiteSummary }} </td>
      <td>{{ cucumberReportSummary.suiteSummary.pending }}</td>
      <td>{{ cucumberReportSummary.suiteSummary.ambiguous }}</td>
      <td>{{ cucumberReportSummary.suiteSummary.unknown }}</td>
      <td>{{ cucumberReportSummary.suiteSummary.total }}</td>
    </tr>
  </table>
</body>
</html>`
