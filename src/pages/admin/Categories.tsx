import { useEffect, useState } from "react";
import { api, authHeader } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminCategories() {
  const { token } = useAuth();
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await api<{ categories: any[] }>("/categories");
      setCategories(res.categories);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!name.trim()) return;
    await api("/categories", { method: "POST", headers: authHeader(token || undefined), body: JSON.stringify({ name }) });
    setName("");
    load();
  };

  const remove = async (id: string) => {
    await api(`/categories/${id}`, { method: "DELETE", headers: authHeader(token || undefined) });
    load();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Categories</h2>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="flex gap-2 items-center max-w-md">
        <Input placeholder="New category name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={add}>Add</Button>
      </div>
      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c._id} className="flex items-center justify-between border rounded p-2">
            <span>{c.name}</span>
            <Button size="sm" variant="destructive" onClick={() => remove(c._id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
