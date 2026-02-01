import { useState } from "react";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { ProductCard } from "../components/ProductCard";
import { ProductsFilters } from "../components/ProductsFilters";
import { ProductsPagination } from "../components/ProductsPagination";
import { useDebounce } from "@/hooks/useDebounce";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useProductsQuery({
    title: debouncedSearch || undefined,
    categoryId: category || undefined,
    offset: page * 10,
    limit: 10,
  });

  if (isLoading) return <p>Loading Products...</p>;
  if (!data?.length) return <p>No Products Found</p>;

  return (
    <>
      <ProductsFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      <div className="grid grid-cols-4 gap-6 mt-6">
        {data.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <ProductsPagination page={page} setPage={setPage} />
    </>
  );
}