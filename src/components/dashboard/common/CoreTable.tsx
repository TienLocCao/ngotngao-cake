import React from 'react';
import Pagination from './Pagination';

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
  total: number;
  loading?: boolean;
}

function CoreTable<T>({
  columns,
  data,
  renderRow,
  minHeight,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
  total,
  loading
}: CoreTableProps<T>) {

  const totalPages = Math.ceil(total / pageSize);
  // const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto relative">
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
          {loading && (
            <div className="absolute top-[44px] left-0 w-full h-1 bg-blue-500 animate-pulse z-20" />
            // 44px là chiều cao của thead, bạn có thể chỉnh nếu cần
          )}
          <tbody className="divide-y divide-gray-200 bg-white">
             {
                data.map((item, index) => (
                  <React.Fragment key={index}>{renderRow(item)}</React.Fragment>
                ))
              }
          </tbody>
        </table>
      </div>

      {onPageChange && totalPages > 1 && (
        <Pagination
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChange!}
        />
      )}
    </div>

  );
}

export default CoreTable;
