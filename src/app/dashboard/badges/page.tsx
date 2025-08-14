'use client';
import DashboardLayout from '@/components/dashboard/Layout';
import React, { useEffect, useState } from 'react';

import { Badge, CreateBadgeDto, UpdateBadgeDto } from '@/types/badge';
import { toast } from 'react-toastify';
import BadgeForm from '@/components/dashboard/badge/Form';
import BadgeTable from '@/components/dashboard/badge/Table';
import BadgeActions from '@/components/dashboard/badge/Actions';
import DeleteBadgeModal from '@/components/dashboard/badge/ModalDelete';
import SectionHeader from '@/components/dashboard/common/SectionHeader';
import { useModal } from '@/hooks/useModal';
import { useDebounce } from '@/hooks/useDebounce';

import { BadgeAPI } from "@/lib/api";

const BadgeList = () => {
  const [total, setTotal] = useState<number>(0);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const formModal = useModal<Badge>();
  const deleteModal = useModal<Badge>();

  const fetchBadges = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search: search,
      });


      const response = await BadgeAPI.getList(query as any);
      console.log("Response from API:", response);
      if (!response.status) throw new Error('Failed to fetch badges');

      const { items, total } = await response.data;
      console.log("Fetched categories:", items, total);
      const formattedBadges = items.map((badge: any): Badge => ({
        id: badge.id,
        name: badge.name,
      }));

      setBadges(formattedBadges);
      setTotal(total);
    } catch {
      setBadges([]);
      toast.error('Failed to fetch badges');
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
      fetchBadges();
  }, [currentPage, debouncedSearch]);

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleCreateBadge = async (data: CreateBadgeDto) => {
    try {
      await BadgeAPI.create(data);
      toast.success('Badge created');
      await fetchBadges();
      return { success: true };
    } catch (err: any) {
      let errorMsg = 'Failed to create badge';
      if (err.response?.data?.error) {
        errorMsg = err.response.data.error; // ví dụ: "Badge đã tồn tại"
      }
      return { success: false, fieldErrors: { name: errorMsg } };
    }
  };

  const handleEditBadge = async (data: UpdateBadgeDto) => {
    if (!formModal.data) {
      return { success: false, fieldErrors: { name: 'Badge not found' } };
    }
    try {
      await BadgeAPI.update(formModal.data.id, { name: data.name! });
      toast.success('Badge updated');
      await fetchBadges();
      return { success: true };
    } catch (err: any) {
      let errorMsg = 'Failed to update badge';
      if (err.response?.data?.error) {
        errorMsg = err.response.data.error;
      }
      return { success: false, fieldErrors: { name: errorMsg } };
    }
  };

  const handleDeleteBadge = async () => {
    if (!deleteModal.data) return;
    try {
      console.log("Deleting badge:", deleteModal);
      await BadgeAPI.delete(deleteModal.data.id);
      toast.success('Badge deleted');
      await fetchBadges();
    } catch {
      toast.error('Failed to delete badge');
    } finally {
      deleteModal.close();
    }
  };

  const handleNewBadge = () => {
    formModal.open();
  };

  const badgeActions = () => (
    <BadgeActions
      onNewBadge={handleNewBadge}
      onChangeSearch={handleSearch}
    />
  );

  return (
    <DashboardLayout>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 flex-1 overflow-hidden w-full">
        <SectionHeader
          title="Badges"
          description="A list of all badges."
          actions={badgeActions()}
        />
        <BadgeTable
          badges={badges}
          onEdit={(badge) => formModal.open(badge)}
          onDelete={(badge) => deleteModal.open(badge)}
          currentPage={currentPage}
          pageSize={10}
          onPageChange={(e) => {setCurrentPage(e)}}
          total={total}
          loading={loading}
        />

        <BadgeForm
          isOpen={formModal.isOpen}
          onClose={formModal.close}
          onSubmit={formModal.data ? handleEditBadge : handleCreateBadge}
          badge={formModal.data || undefined}
        />

        {deleteModal.isOpen && deleteModal.data && (
          <DeleteBadgeModal
            badge={deleteModal.data}
            onCancel={deleteModal.close}
            onConfirm={handleDeleteBadge}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default BadgeList;

