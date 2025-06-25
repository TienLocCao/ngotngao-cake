import React from 'react';

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface CoreTableProps<T> {
  columns: Column[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
  minHeight?: string;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
}

function CoreTable<T>({
  columns,
  data,
  renderRow,
  minHeight,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
}: CoreTableProps<T>) {

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    const siblingCount = 1;
    const showDots = '...';

    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

    pages.push(1);

    if (startPage > 2) {
      pages.push(showDots);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push(showDots);
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };
  
  return (
    <div className={`h-full overflow-auto ${minHeight ? `min-h-[${minHeight}]` : ''}`}>
      <table className="min-w-full table-fixed divide-y divide-gray-300">
        <thead className="sticky top-0 bg-gray-50 z-10">
        <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {/* {data.map((item) => renderRow(item))} */}
          {paginatedData.map((item, index) => (
            <React.Fragment key={index}>{renderRow(item)}</React.Fragment>
          ))}
        </tbody>
      </table>

      {onPageChange && totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 p-4 text-sm text-gray-700 flex-wrap">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {generatePageNumbers().map((page, idx) =>
            page === '...' ? (
              <span key={idx} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(Number(page))}
                className={`px-3 py-1 border rounded ${
                  currentPage === page ? 'bg-indigo-600 text-white' : ''
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}

export default CoreTable;
