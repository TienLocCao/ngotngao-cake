import React from 'react';
import { PlusIcon, ChevronDownIcon   } from '@heroicons/react/24/outline';

type Props = {
  onNewProject: () => void;
  onChangeSearch: (value: string) => void;
  onChangeStatus: (value: string) => void;
};
const ProjectActions = ({ onNewProject, onChangeSearch, onChangeStatus }: Props) => {
  
  return (
    <div className="mt-4 sm:mt-0 sm:ml-16 inline-flex items-center justify-end">
      <input
        type="text"
        placeholder="Search by name..."
        className="border border-gray-300 rounded px-3 py-2 w-1/3"
        onChange={(e) => onChangeSearch(e.target.value)}
      />
      <div className="relative inline-block mx-3">
        <select className="appearance-none border pl-[20px] pr-[30px] py-2 rounded" onChange={(e) => onChangeStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
      <button
        onClick={onNewProject}
        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto"
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
        New Project
      </button>
    </div>
  );
};

export default ProjectActions;
