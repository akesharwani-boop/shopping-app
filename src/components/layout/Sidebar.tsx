type Props = {
  category: number | null;
  setCategory: (v: number | null) => void;
};

const categories = [
  { id: null, label: "All" },
  { id: 1, label: "Clothes" },
  { id: 2, label: "Electronics" },
  { id: 3, label: "Furniture" },
  { id: 4, label: "Shoes" },
];

export function Sidebar({ category, setCategory }: Props) {
  return (
    <aside className="w-64">
      <div className="bg-white border rounded-xl p-4 sticky top-24">
        
        {/* Heading */}
        <h3 className="text-sm font-semibold text-gray-800 mb-4">
          Categories
        </h3>

        {/* Category List */}
        <ul className="space-y-1">
          {categories.map((c) => {
            const isActive = category === c.id;

            return (
              <li
                key={String(c.id)}
                onClick={() => setCategory(c.id)}
                className={`px-3 py-2 rounded-lg text-sm cursor-pointer transition
                  ${
                    isActive
                      ? "bg-black text-white font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {c.label}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}