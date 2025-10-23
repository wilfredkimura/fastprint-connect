import { useEffect, useState } from "react";
import { api, authHeader } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api<{ stats: any; recentOrders: any[] }>("/admin/stats", { headers: authHeader(token || undefined) });
        setData(res);
      } catch (e: any) {
        setError(e.message);
      }
    })();
  }, [token]);

  if (error) return <div className="container py-8">Error: {error}</div>;
  if (!data) return <div className="container py-8">Loading...</div>;

  const { stats, recentOrders } = data;
  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-2xl font-heading font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Pending Orders" value={stats.pendingOrders} />
        <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} />
        <StatCard title="Low Stock Alerts" value={stats.lowStockAlerts} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
        <div className="border rounded">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Status</th>
                <th className="p-2">Total</th>
                <th className="p-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o._id} className="border-t">
                  <td className="p-2">{o._id}</td>
                  <td className="p-2">{o.user?.name || "-"}</td>
                  <td className="p-2">{o.status}</td>
                  <td className="p-2">${o.total.toFixed(2)}</td>
                  <td className="p-2">{new Date(o.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="border rounded p-4">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
