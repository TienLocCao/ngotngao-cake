import React from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "@remixicon/react";

const Pagination = () => {
  return (
    <div className="mt-12 flex justify-center">
      <nav className="flex items-center gap-2">
        <button
          className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          <RiArrowLeftSLine className="text-xl" />
        </button>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-sm bg-primary text-white"
        >
          1
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          2
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          3
        </button>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          <RiArrowRightSLine className="text-xl" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
