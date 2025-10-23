import { useEffect, useState } from "react";
import { api, authHeader } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";

export default function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const qs = new URLSearchParams();
      if (status) qs.set("status", status);
      const res = await api<{ orders: any[] }>(`/orders?${qs.toString()}` as any, { headers: authHeader(token || undefined) });
      setOrders(res.orders);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, token]);

  const updateStatus = async (id: string, nextStatus: string) => {
    await api(`/orders/${id}/status`, {
      method: "PUT",
      headers: { ...authHeader(token || undefined) },
      body: JSON.stringify({ status: nextStatus }),
    });
    load();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Orders</h2>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="flex gap-2 items-center">
        <label className="text-sm">Filter by status</label>
        <Input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="e.g. Pending" className="max-w-xs" />
      </div>
      <div className="border rounded overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Status</th>
              <th className="p-2">Total</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t">
                <td className="p-2">{o._id}</td>
                <td className="p-2">{o.user?.name || "-"}</td>
                <td className="p-2">{o.status}</td>
                <td className="p-2">${o.total?.toFixed?.(2) ?? o.total}</td>
                <td className="p-2 space-x-2">
                  {[
                    "Pending",
                    "Processing",
                    "Completed",
                    "Ready for Pickup",
                    "Shipped",
                    "Cancelled",
                  ].map((s) => (
                    <button key={s} className="underline text-xs" onClick={() => updateStatus(o._id, s)}>
                      {s}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
