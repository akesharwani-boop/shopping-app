import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  category: number | null;
  setCategory: (v: number | null) => void;
};

export function ProductsFilters({
  search,
  setSearch,
  category,
  setCategory,
}: Props) {
  return (
    <div className="flex gap-4 mb-4">
      <Input
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border rounded px-2"
        value={category ?? ""}
        onChange={(e) =>
          setCategory(e.target.value ? Number(e.target.value) : null)
        }
      >
        <option value="">All</option>
        <option value="1">Clothes</option>
        <option value="2">Electronics</option>
        <option value="3">Furniture</option>
        <option value="4">Shoes</option>
      </select>
    </div>
  );
}