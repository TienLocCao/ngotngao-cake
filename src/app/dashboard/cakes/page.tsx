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
import { CakeAPI, CategoryAPI, BadgeAPI } from "@/lib/api";

const ProductList = () => {
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
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

      const response = await CakeAPI.getList(query as any);
      if (!response.status) throw new Error('Failed to fetch products');

      const { items, total } = await response.data;
      
      const formattedProducts = items.map((cake: any): Product => ({
        id: cake.id,
        name: cake.name,
        image: cake.imageUrl,
        price: cake.price,
        description: cake.description,
        badgeName: cake.badge.name || undefined,
        badgeId: cake.badge.id,
        categoryId: cake.categoryId,
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

  const fetchCategories = async () => {
    try {
      const query = new URLSearchParams({
        page: 'all',
        limit: '10',
      });
      const res = await CategoryAPI.getList(query as any);
      if (!res.status) throw new Error('Failed to fetch categories');
      setCategories(res.data.items);
    } catch {
      toast.error('Failed to fetch categories');
      setCategories([]);
    }
  };

  const fetchBadges = async () => {
    try {
      const query = new URLSearchParams({
        page: 'all',
        limit: '10',
      });
      const res = await BadgeAPI.getList(query as any);
      if (!res.status) throw new Error('Failed to fetch badges');
      setBadges(res.data.items);
    } catch {
      toast.error('Failed to fetch badges');
      setBadges([]);
    }
  };

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
      fetchProducts();
  }, [currentPage, status, debouncedSearch]);
  useEffect(() => {
      fetchCategories();
      fetchBadges();
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleChangeStatus = (value: string) => {
    setStatus(value)
  }

  const handleCreateProduct = async (formData: CreateProductDto) => {
    try {
      const payload = {
          name: formData.name,
          description: formData.description,
          fullDescription: formData.description, // Hoặc lấy từ form nếu có field riêng
          imageUrl: formData.image,
          price: formData.price,
          categoryId: formData.categoryId, // TODO: Lấy từ state hoặc form
          badgeId: formData.badgeId ? formData.badgeId : null,
          sizes: formData.sizes.map(size => ({
            sizeLabel: size.sizeLabel,
            servings: '4-6 (test)', // TODO: Lấy từ form nếu có
            price: size.price,
          })),
        };
      await CakeAPI.create(payload as any);
      toast.success('Product created');
      await fetchProducts();
      return { success: true };
    } catch (err: any) {
      let errorMsg = 'Failed to create category';
      if (err.response?.data?.error) {
        errorMsg = err.response.data.error; // ví dụ: "Category đã tồn tại"
      }
      return { success: false, fieldErrors: { name: errorMsg } };
    }
  };

  const handleEditProduct = async (data: UpdateProductDto) => {
    console.log('Editing product with data:', data);
    if (!formModal.data) return { success: false, fieldErrors: { name: 'Cake not found' } };
    try {
      await CakeAPI.update(formModal.data.id, { ...data, sizes: (data.sizes ?? []).map(size => ({ ...size, servings: '4-6 (test)' })) } as any);
      toast.success('Product updated');
      await fetchProducts();
      return { success: true };
    } catch (err: any) {
      let errorMsg = 'Failed to create category';
      if (err.response?.data?.error) {
        errorMsg = err.response.data.error; // ví dụ: "Category đã tồn tại"
      }
      return { success: false, fieldErrors: { name: errorMsg } };
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteModal.data) return;
    try {
      await CakeAPI.delete(deleteModal.data.id);
      toast.success('Product deleted');
      await fetchProducts();
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
          product={formModal.data ?? undefined}
          categories={categories}
          badges={badges} 
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

