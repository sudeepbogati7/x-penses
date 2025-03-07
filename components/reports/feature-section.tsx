export default function FeaturesSection() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Report Features</h2>
          <p className="text-muted-foreground mt-1">Powerful reporting tools to analyze your expenses</p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 space-y-2">
            <h3 className="font-medium text-lg">Customizable Reports</h3>
            <p className="text-muted-foreground text-sm">
              Create reports with custom date ranges, categories, and grouping options.
            </p>
          </div>
  
          <div className="border rounded-lg p-6 space-y-2">
            <h3 className="font-medium text-lg">Multiple Export Formats</h3>
            <p className="text-muted-foreground text-sm">
              Download your reports in PDF, CSV, or Excel formats for easy sharing.
            </p>
          </div>
  
          <div className="border rounded-lg p-6 space-y-2">
            <h3 className="font-medium text-lg">Scheduled Reports</h3>
            <p className="text-muted-foreground text-sm">
              Set up automatic report generation and delivery on your preferred schedule.
            </p>
          </div>
  
          <div className="border rounded-lg p-6 space-y-2">
            <h3 className="font-medium text-lg">Visual Analytics</h3>
            <p className="text-muted-foreground text-sm">
              View your expense data with interactive charts and graphs for better insights.
            </p>
          </div>
  
          <div className="border rounded-lg p-6 space-y-2">
            <h3 className="font-medium text-lg">Category Analysis</h3>
            <p className="text-muted-foreground text-sm">
              Break down expenses by category to identify spending patterns.
            </p>
          </div>
  
          <div className="border rounded-lg p-6 space-y-2">
            <h3 className="font-medium text-lg">Trend Comparison</h3>
            <p className="text-muted-foreground text-sm">
              Compare expenses across different time periods to track your progress.
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  