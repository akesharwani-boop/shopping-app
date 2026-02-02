type Props = {
  page: number;
  setPage: (page: number) => void;
};

export function ProductsPagination({ page, setPage }: Props) {
  const totalPages = 5; 

  return (
    <div className="flex justify-center items-center gap-2 mt-12">

      
      <button
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
        className="px-3 py-2 rounded-md border text-sm font-medium
                   hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ‹ Prev
      </button>

   
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition
            ${
              page === i
                ? "bg-black text-white"
                : "border hover:bg-gray-100"
            }`}
        >
          {i + 1}
        </button>
      ))}

      
      <button
        disabled={page === totalPages - 1}
        onClick={() => setPage(page + 1)}
        className="px-3 py-2 rounded-md border text-sm font-medium
                   hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next ›
      </button>
    </div>
  );
}