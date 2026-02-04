import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r p-4">
      <h2 className="font-bold text-lg mb-4">Admin Panel</h2>

      <nav className="flex flex-col gap-3">
        <NavLink to="/admin" className="hover:underline">
          Dashboard
        </NavLink>

        <NavLink to="/admin/users" className="hover:underline">
          Manage Users
        </NavLink>

        <NavLink to="/admin/products" className="hover:underline">
          Manage Products
        </NavLink>
      </nav>
    </aside>
  );
}