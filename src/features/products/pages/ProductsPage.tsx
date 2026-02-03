import { useState } from "react";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { ProductCard } from "../components/ProductCard";
import { ProductsFilters } from "../components/ProductsFilters";
import { ProductsPagination } from "../components/ProductsPagination";
import { useDebounce } from "@/hooks/useDebounce";
import { Sidebar } from "@/components/layout/Sidebar";
export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  // const[price,setPrice] = useState("")
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const debouncedSearch = useDebounce(search);

  const { data = [], isLoading } = useProductsQuery({
    title: debouncedSearch || undefined,
    categoryId: category || undefined,
    // price: price ? Number(price) : undefined,
    price_min: priceMin ? Number(priceMin) : undefined,
    price_max: priceMax ? Number(priceMax) : undefined,
    offset: page * 10,
    limit: 10,
  });

  if (isLoading) return <p>Loading Products...</p>;
  // if (!data?.length) return <p>No Products Found</p>;

  return (
    <div className="flex gap-6">
      {/* LEFT SIDEBAR */}
      <Sidebar category={category} setCategory={setCategory} />

      {/* RIGHT CONTENT */}
      <div className="flex-1">
        <ProductsFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No Products Found
            </p>
          ) : (
            data.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>

        <ProductsPagination page={page} setPage={setPage} />
      </div>
    </div>
  );
}
