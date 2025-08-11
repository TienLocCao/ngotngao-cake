'use client';
import DashboardLayout from '@/components/dashboard/Layout';
import React, { useEffect, useState } from 'react';

import { Category, CreateCategoryDto, UpdateCategoryDto } from '@/types/category';
import { toast } from 'react-toastify';
import CategoryForm from '@/components/dashboard/category/Form';
import CategoryTable from '@/components/dashboard/category/Table';
import CategoryActions from '@/components/dashboard/category/Actions';
import DeleteCategoryModal from '@/components/dashboard/category/ModalDelete';
import SectionHeader from '@/components/dashboard/common/SectionHeader';
import { useModal } from '@/hooks/useModal';
import { useDebounce } from '@/hooks/useDebounce';

import { CategoryAPI } from "@/lib/api";

const CategoryList = () => {
  const [total, setTotal] = useState<number>(0);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const formModal = useModal<Category>();
  const deleteModal = useModal<Category>();

  const fetchCategorys = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search: search,
      });


      const response = await CategoryAPI.getList(query as any);
      console.log("Response from API:", response);
      if (!response.status) throw new Error('Failed to fetch categorys');

      const { items, total } = await response.data;
      console.log("Fetched categories:", items, total);
      const formattedCategorys = items.map((category: any): Category => ({
        id: category.id,
        name: category.name,
      }));

      setCategorys(formattedCategorys);
      setTotal(total);
    } catch {
      setCategorys([]);
      toast.error('Failed to fetch categorys');
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
      fetchCategorys();
  }, [currentPage, debouncedSearch]);

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleCreateCategory = async (data: CreateCategoryDto) => {
    try {
      await CategoryAPI.create(data);
      toast.success('Category created');
      await fetchCategorys();
      return { success: true };
    } catch (err: any) {
      let errorMsg = 'Failed to create category';
      if (err.response?.data?.error) {
        errorMsg = err.response.data.error; // ví dụ: "Category đã tồn tại"
      }
      return { success: false, fieldErrors: { name: errorMsg } };
    }
  };

  const handleEditCategory = async (data: UpdateCategoryDto) => {
    if (!formModal.data) {
      return { success: false, fieldErrors: { name: 'Category not found' } };
    }
    try {
      await CategoryAPI.update(formModal.data.id, { name: data.name! });
      toast.success('Category updated');
      await fetchCategorys();
      return { success: true };
    } catch (err: any) {
      let errorMsg = 'Failed to update category';
      if (err.response?.data?.error) {
        errorMsg = err.response.data.error;
      }
      return { success: false, fieldErrors: { name: errorMsg } };
    }
  };

  const handleDeleteCategory = async () => {
    if (!deleteModal.data) return;
    try {
      console.log("Deleting category:", deleteModal);
      await CategoryAPI.delete(deleteModal.data.id);
      toast.success('Category deleted');
      await fetchCategorys();
    } catch {
      toast.error('Failed to delete category');
    } finally {
      deleteModal.close();
    }
  };

  const handleNewCategory = () => {
    formModal.open();
  };

  const categoryActions = () => (
    <CategoryActions
      onNewCategory={handleNewCategory}
      onChangeSearch={handleSearch}
    />
  );

  return (
    <DashboardLayout>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 flex-1 overflow-hidden w-full">
        <SectionHeader
          title="Categorys"
          description="A list of all categorys."
          actions={categoryActions()}
        />
        <CategoryTable
          categorys={categorys}
          onEdit={(category) => formModal.open(category)}
          onDelete={(category) => deleteModal.open(category)}
          currentPage={currentPage}
          pageSize={10}
          onPageChange={(e) => {setCurrentPage(e)}}
          total={total}
          loading={loading}
        />

        <CategoryForm
          isOpen={formModal.isOpen}
          onClose={formModal.close}
          onSubmit={formModal.data ? handleEditCategory : handleCreateCategory}
          category={formModal.data || undefined}
        />

        {deleteModal.isOpen && deleteModal.data && (
          <DeleteCategoryModal
            category={deleteModal.data}
            onCancel={deleteModal.close}
            onConfirm={handleDeleteCategory}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default CategoryList;

