const categories= ["All", "Clothes", "Electronics", "Furniture", "Shoes"]
export function Sidebar() {
  return (
    <aside className="w-60 p-4 border-r">
      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c} className="cursor-pointer hover:underline">{c}</li>
        ))}
      </ul>
    </aside>
  );
}
