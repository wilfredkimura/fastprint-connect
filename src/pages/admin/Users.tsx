import { useEffect, useState } from "react";
import { api, authHeader } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await api<{ users: any[] }>("/users", { headers: authHeader(token || undefined) });
      setUsers(res.users);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const filtered = users.filter((u) => {
    const t = `${u.name} ${u.email} ${u.phone}`.toLowerCase();
    return t.includes(q.toLowerCase());
  });

  const changeRole = async (id: string, role: string) => {
    await api(`/users/${id}`, { method: 'PUT', headers: authHeader(token || undefined), body: JSON.stringify({ role }) });
    load();
  };

  const remove = async (id: string) => {
    await api(`/users/${id}`, { method: 'DELETE', headers: authHeader(token || undefined) });
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Users</h2>
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="flex gap-2 items-center">
        <Input placeholder="Search users" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-sm" />
      </div>
      <div className="border rounded overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2 space-x-2">
                  <Button size="sm" variant="outline" onClick={() => changeRole(u._id, u.role === 'admin' ? 'user' : 'admin')}>
                    {u.role === 'admin' ? 'Demote to user' : 'Promote to admin'}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => remove(u._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
