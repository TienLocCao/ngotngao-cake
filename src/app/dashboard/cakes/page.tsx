'use client';
import DashboardLayout from '@/components/dashboard/Layout';
import React, { useEffect, useState } from 'react';

import { Product, CreateProductDto, UpdateProductDto } from '@/types/product';
import { toast } from 'react-toastify';
import ProductForm from '@/components/dashboard/product/Form';
import ProductTable from '@/components/dashboard/product/Table';
import ProductActions from '@/components/dashboard/product/Actions';
import DeleteProductModal from '@/components/dashboard/product/ModalDelete';
import Loader from '@/components/dashboard/common/Loader';
import SectionHeader from '@/components/dashboard/common/SectionHeader';
import { useModal } from '@/hooks/useModal';
import { useDebounce } from '@/hooks/useDebounce';

// interface Product {
//   id: string;
//   title: string;
//   image: string;
//   price: number;
//   description: string;
//   badgeName?: string;
//   sizes: { id: string; sizeLabel: string; price: any }[];
// }


const ProductList = () => {
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState('featured');

  const formModal = useModal<Product>();
  const deleteModal = useModal<Product>();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search: search,
        sort: status,
      });

      // selectedStatus.forEach((status) => {
      //   query.append('status', status);
      // });

      // selectedTags.forEach((tag) => {
      //   query.append('tag', tag);
      // });

      const response = await fetch(`/api/cakes?${query}`);
      if (!response.ok) throw new Error('Failed to fetch products');

      const { items, total } = await response.json();

      const formattedProducts = items.map((cake: any): Product => ({
        id: cake.id,
        name: cake.title,
        image: cake.imageUrl,
        price: cake.price,
        description: cake.description,
        badgeName: cake.badge.name || undefined,
        sizes: cake.sizes
      }));

      setProducts(formattedProducts);
      setTotal(total);
    } catch {
      setProducts([]);
      toast.error('Failed to fetch products');
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
      fetchProducts();
  }, [currentPage, status, debouncedSearch]);

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleChangeStatus = (value: string) => {
    setStatus(value)
  }

  const handleCreateProduct = async (data: CreateProductDto) => {
    try {
      toast.success('Product created');
      return true;
    } catch {
      toast.error('Failed to create product');
      return false;
    }
  };

  const handleEditProduct = async (data: UpdateProductDto) => {
    if (!formModal.data) return false;
    try {
      toast.success('Product updated');
      return true;
    } catch {
      toast.error('Failed to update product');
      return false;
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteModal.data) return;
    try {
      toast.success('Product deleted');
    } catch {
      toast.error('Failed to delete product');
    } finally {
      deleteModal.close();
    }
  };

  const handleNewProduct = () => {
    formModal.open();
  };

  const productActions = () => (
    <ProductActions
      onNewProduct={handleNewProduct}
      onChangeSearch={handleSearch}
      onChangeStatus={handleChangeStatus}
    />
  );

  return (
    <DashboardLayout>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 flex-1 overflow-hidden w-full">
        <SectionHeader
          title="Products"
          description="A list of all products."
          actions={productActions()}
        />
        <ProductTable
          products={products}
          onEdit={(product) => formModal.open(product)}
          onDelete={(product) => deleteModal.open(product)}
          currentPage={currentPage}
          pageSize={10}
          onPageChange={(e) => {setCurrentPage(e)}}
          total={total}
          loading={loading}
        />

        <ProductForm
          isOpen={formModal.isOpen}
          onClose={formModal.close}
          onSubmit={formModal.data ? handleEditProduct : handleCreateProduct}
          product={formModal.data || undefined}
        />

        {deleteModal.isOpen && deleteModal.data && (
          <DeleteProductModal
            product={deleteModal.data}
            onCancel={deleteModal.close}
            onConfirm={handleDeleteProduct}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductList;

