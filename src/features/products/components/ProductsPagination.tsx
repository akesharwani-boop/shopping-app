type Props = {
  page: number;
  setPage: (v: number) => void;
};

export function ProductsPagination({ page, setPage }: Props) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
        Prev
      </button>
      <span>Page {page + 1}</span>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}