import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r p-4">
      <h2 className="font-bold text-lg mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/admin/users"
          className="px-3 py-2 rounded hover:bg-gray-100"
        >
          Manage Users
        </NavLink>

        <NavLink
          to="/admin/products"
          className="px-3 py-2 rounded hover:bg-gray-100"
        >
          Manage Products
        </NavLink>
         <NavLink
          to="/admin/categories"
          className="px-3 py-2 rounded hover:bg-gray-100"
        >
          Manage Categories
        </NavLink>
      </nav>
    </aside>
  );
}
