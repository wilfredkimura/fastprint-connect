import { useEffect, useState } from "react";
import { api, authHeader } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const qs = new URLSearchParams();
      if (q) qs.set("q", q);
      const res = await api<{ products: any[] }>(`/products?${qs.toString()}` as any);
      setProducts(res.products);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products</h2>
        <Button onClick={() => alert("Open create product form (to be implemented)")}>Add Product</Button>
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="flex gap-2 items-center">
        <Input placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-sm" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border rounded p-3 space-y-2">
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-muted-foreground">{p.category?.name}</div>
            <div className="text-sm">Stock: {p.stock}</div>
            <div className="text-sm">Price: ${p.basePrice}</div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => alert("Edit product (to be implemented)")}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={async () => {
                await api(`/products/${p._id}`, { method: 'DELETE', headers: authHeader(token || undefined) });
                load();
              }}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
