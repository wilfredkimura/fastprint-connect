import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const { pathname } = useLocation();
  const links = [
    { to: "/admin", label: "Overview" },
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/categories", label: "Categories" },
    { to: "/admin/analytics", label: "Analytics" },
  ];
  return (
    <div className="container py-6 grid grid-cols-1 md:grid-cols-6 gap-6">
      <aside className="md:col-span-1 border rounded p-3 space-y-2">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`block px-2 py-1 rounded text-sm ${pathname === l.to ? "bg-muted font-medium" : "hover:bg-muted"}`}
          >
            {l.label}
          </Link>
        ))}
      </aside>
      <main className="md:col-span-5">
        <Outlet />
      </main>
    </div>
  );
}
