import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/types/badge';
import CoreTable from '@/components/dashboard/common/CoreTable';
import { on } from 'events';

type Props = {
  badges: Badge[];
  onEdit: (badge: Badge) => void;
  onDelete: (badge: Badge) => void;
  currentPage: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  total: number;
  loading?: boolean;
};

const columns = [
  { key: 'title', label: 'Name', width: '200px' },
  { key: 'actions', label: '', width: '100px' },
];

const BadgeTable = ({ badges, onEdit, onDelete, currentPage, pageSize, onPageChange, total, loading }: Props) => (
  <div className="flex flex-1 overflow-y-auto">
    <div className="inline-block w-full align-middle">
      <CoreTable
        columns={columns}
        data={[...badges]}
        minHeight="500px"
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={ onPageChange }
        total={total}
        loading={loading}
        renderRow={(badge: Badge) => (
          <tr key={badge.id}>
            <td className="px-4 py-3 text-sm text-gray-900 truncate" title={badge.name}>
              {badge.name}
            </td>
            
            <td className="px-4 py-3 text-sm text-right">
              <button onClick={() => onEdit(badge)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                <PencilIcon className="h-5 w-5" />
              </button>
              <button onClick={() => onDelete(badge)} className="text-red-600 hover:text-red-900">
                <TrashIcon className="h-5 w-5" />
              </button>
            </td>
          </tr>
        )}
      />
    </div>
  </div>
);

export default BadgeTable;
