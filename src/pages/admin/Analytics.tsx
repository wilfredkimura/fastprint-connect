export default function AdminAnalytics() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Analytics</h2>
      <p className="text-sm text-muted-foreground">Basic charts for sales trends and popular products can be added here.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded p-4 h-64">Sales trend chart (todo)</div>
        <div className="border rounded p-4 h-64">Popular products chart (todo)</div>
      </div>
    </div>
  );
}
