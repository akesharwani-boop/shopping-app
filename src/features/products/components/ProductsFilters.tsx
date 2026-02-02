type Props = {
  search: string;
  setSearch: (v: string) => void;

  category: number | null;
  setCategory: (v: number | null) => void;

  priceMin: string;
  setPriceMin: (v: string) => void;

  priceMax: string;
  setPriceMax: (v: string) => void;
};

export function ProductsFilters({
  search,
  setSearch,
  category,
  setCategory,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-lg border mb-6">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">

       
        <select
          value={category ?? ""}
          onChange={(e) =>
            setCategory(e.target.value ? Number(e.target.value) : null)
          }
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">Category</option>
          <option value="1">Clothes</option>
          <option value="2">Electronics</option>
          <option value="3">Furniture</option>
          <option value="4">Shoes</option>
        </select>

      
        <input
          type="number"
          placeholder="Min price"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />

       
        <input
          type="number"
          placeholder="Max price"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />

        
        <input
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 text-sm col-span-2"
        />

        
        <button
          onClick={() => {
            setSearch("");
            setCategory(null);
            setPriceMin("");
            setPriceMax("");
          }}
          className="bg-black text-white px-4 py-2 rounded text-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );
}