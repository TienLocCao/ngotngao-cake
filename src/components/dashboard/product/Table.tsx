import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Product } from '@/types/product';
import CoreTable from '@/components/dashboard/common/CoreTable';
import { on } from 'events';

type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  currentPage: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  total: number;
  loading?: boolean;
};

const columns = [
  { key: 'title', label: 'Name', width: '200px' },
  { key: 'image', label: 'Image', width: '120px' },
  { key: 'price', label: 'Price', width: '100px' },
  { key: 'description', label: 'Description', width: '300px' },
  { key: 'badgeName', label: 'Badge', width: '120px' },
  { key: 'actions', label: '', width: '100px' },
];

const ProductTable = ({ products, onEdit, onDelete, currentPage, pageSize, onPageChange, total, loading }: Props) => (
  <div className="flex flex-1 overflow-y-auto">
    <div className="inline-block w-full align-middle">
      <CoreTable
        columns={columns}
        data={[...products]}
        minHeight="500px"
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={ onPageChange }
        total={total}
        loading={loading}
        renderRow={(product: Product) => (
          <tr key={product.id}>
            <td className="px-4 py-3 text-sm text-gray-900 truncate" title={product.name}>
              {product.name}
            </td>
            <td className="px-4 py-3 text-sm text-gray-900 truncate" title={product.image}>
              <img src={product.image} alt={product.name} className='w-20' />
            </td>
            <td className="px-4 py-3 text-sm text-gray-900 truncate" title={product.price}>
              { (+product.price).toLocaleString('vi-VN') }
            </td>
            <td className="px-4 py-3 text-sm text-gray-500 truncate" title={product.description}>{product.description}</td>
            <td className="px-4 py-3 text-sm text-gray-500 truncate" title={product.badgeName}>{product.badgeName}</td>
            <td className="px-4 py-3 text-sm text-right">
              <button onClick={() => onEdit(product)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                <PencilIcon className="h-5 w-5" />
              </button>
              <button onClick={() => onDelete(product)} className="text-red-600 hover:text-red-900">
                <TrashIcon className="h-5 w-5" />
              </button>
            </td>
          </tr>
        )}
      />
    </div>
  </div>
);

export default ProductTable;
