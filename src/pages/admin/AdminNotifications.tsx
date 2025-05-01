import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import NotificationsManager from '@/components/admin/NotificationsManager';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';

const AdminNotifications = () => {
  return (
    <AdminAuthGuard>
      <AdminLayout>
        <NotificationsManager />
      </AdminLayout>
    </AdminAuthGuard>
  );
};

export default AdminNotifications; 