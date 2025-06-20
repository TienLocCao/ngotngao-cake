import React, {useCallback} from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useCollapse } from "@/contexts/CollapseContext";

const HeaderComponent = () => {
  const { toggleCollapse } = useCollapse();
  return (
    (
      <header className="bg-white shadow shrink-0">

        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button className="p-2" onClick={toggleCollapse}>
              <Bars3Icon className="h-8 w-8 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Project Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Tien Loc</span>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    )
  );
};

const AppHeader = React.memo(HeaderComponent);

export default AppHeader;