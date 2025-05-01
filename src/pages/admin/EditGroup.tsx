import React from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import GroupForm from '@/components/admin/GroupForm';
import { useGroup } from '@/hooks/useGroups';
import { Loader2 } from 'lucide-react';

const EditGroup = () => {
  const { id } = useParams<{ id: string }>();
  const { data: group, isLoading } = useGroup(id || '');

  if (isLoading) {
    return (
      <AdminAuthGuard>
        <AdminLayout>
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin text-adult-accent" />
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    );
  }

  if (!group) {
    return (
      <AdminAuthGuard>
        <AdminLayout>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Grupo não encontrado</h2>
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    );
  }

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Editar Grupo</h2>
          <GroupForm group={group} />
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  );
};

export default EditGroup; 