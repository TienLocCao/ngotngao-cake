import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Project } from '@/types/project';
import CoreTable from '@/components/dashboard/common/CoreTable';
import { on } from 'events';

type Props = {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  currentPage: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
};

const columns = [
  { key: 'name', label: 'Name', width: '200px' },
  { key: 'description', label: 'Description', width: '300px' },
  { key: 'status', label: 'Status', width: '120px' },
  { key: 'actions', label: '', width: '100px' },
];

const ProjectTable = ({ projects, onEdit, onDelete, currentPage, pageSize, onPageChange }: Props) => (
  <div className="flex flex-1 overflow-y-auto">
    <div className="inline-block w-full align-middle">
      <CoreTable
        columns={columns}
        data={projects}
        minHeight="500px"
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={ onPageChange }
        renderRow={(project: Project) => (
          <tr key={project.id}>
            <td className="px-4 py-3 text-sm text-gray-900 truncate" title={project.name}>
              {project.name}
            </td>
            <td className="px-4 py-3 text-sm text-gray-500 truncate" title={project.description}>{project.description}</td>
            <td className="px-4 py-3 text-sm text-gray-500 truncate" title={project.status}>{project.status}</td>
            <td className="px-4 py-3 text-sm text-right">
              <button onClick={() => onEdit(project)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                <PencilIcon className="h-5 w-5" />
              </button>
              <button onClick={() => onDelete(project)} className="text-red-600 hover:text-red-900">
                <TrashIcon className="h-5 w-5" />
              </button>
            </td>
          </tr>
        )}
      />
    </div>
  </div>
);

export default ProjectTable;
