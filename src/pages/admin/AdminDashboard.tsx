import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import { Card } from '@/components/ui/card';
import { useGroups } from '@/hooks/useGroups';
import { useNotifications } from '@/hooks/useNotifications';
import { Users, Bell, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const { data: groups } = useGroups();
  const { data: notifications } = useNotifications();

  const stats = [
    {
      title: 'Total de Grupos',
      value: groups?.length || 0,
      icon: Users,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: 'Notificações Ativas',
      value: notifications?.filter(n => n.active).length || 0,
      icon: Bell,
      color: 'bg-yellow-500/10 text-yellow-500',
    },
    {
      title: 'Receita Total',
      value: groups?.reduce((acc, group) => acc + group.price, 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }) || 'R$ 0,00',
      icon: DollarSign,
      color: 'bg-green-500/10 text-green-500',
    },
  ];

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index} 
                  className={`p-4 sm:p-6 ${stat.color} border-0 transition-transform hover:scale-105`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-80">{stat.title}</p>
                      <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Seção de Atividades Recentes */}
          <Card className="p-4 sm:p-6 bg-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Atividades Recentes</h3>
            <div className="space-y-4">
              {groups?.slice(0, 5).map((group, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-600 last:border-0">
                  <div>
                    <p className="font-medium text-white">{group.name}</p>
                    <p className="text-sm text-gray-400">{group.category}</p>
                  </div>
                  <p className="text-sm font-medium text-white">
                    R$ {group.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  );
};

export default AdminDashboard; 