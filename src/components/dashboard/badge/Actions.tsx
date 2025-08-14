import React from 'react';
import { PlusIcon, ChevronDownIcon   } from '@heroicons/react/24/outline';

type Props = {
  onNewBadge: () => void;
  onChangeSearch: (value: string) => void;
};
const ProjectActions = ({ onNewBadge, onChangeSearch }: Props) => {
  
  return (
    <div className="mt-4 sm:mt-0 sm:ml-16 inline-flex items-center justify-end">
      <input
        type="text"
        placeholder="Search by name..."
        className="border border-gray-300 rounded px-3 py-2 w-1/3 mx-3"
        onChange={(e) => onChangeSearch(e.target.value)}
      />
    
      <button
        onClick={onNewBadge}
        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto"
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
        New Badge
      </button>
    </div>
  );
};

export default ProjectActions;
