import React from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "@remixicon/react";

type Props = {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ total, pageSize, currentPage, onPageChange }: Props) => {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-12 flex justify-center">
      <nav className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RiArrowLeftSLine className="text-xl" />
        </button>

        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-sm border text-sm ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="px-2 text-gray-400 text-sm select-none"
            >
              ...
            </span>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RiArrowRightSLine className="text-xl" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
