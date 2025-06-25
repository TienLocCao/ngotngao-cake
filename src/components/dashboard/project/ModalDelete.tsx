import React from 'react';
import { Project } from '@/types/project';

type Props = {
  project: Project;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteProjectModal = ({ project, onCancel, onConfirm }: Props) => (
  <div className="fixed z-10 inset-0 overflow-y-auto" role="dialog" aria-modal="true">
    <div className="flex items-center justify-center min-h-screen px-4 text-center">
      <div className="fixed inset-0 bg-black/75"></div>
      <span className="hidden sm:inline-block sm:h-screen">&#8203;</span>
      <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl sm:max-w-lg sm:w-full sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Delete Project</h3>
        <p className="mt-2 text-sm text-gray-500">
          Are you sure you want to delete <strong>{project.name}</strong>? This action cannot be undone.
        </p>
        <div className="mt-5 sm:flex sm:flex-row-reverse">
          <button onClick={onConfirm} className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md sm:w-auto mx-3">
            Delete
          </button>
          <button onClick={onCancel} className="mt-3 w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md sm:mt-0 sm:w-auto">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DeleteProjectModal;
