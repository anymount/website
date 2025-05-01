import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import GroupForm from '@/components/admin/GroupForm';

const CreateGroup = () => {
  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Criar Novo Grupo</h2>
          <GroupForm />
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  );
};

export default CreateGroup; 