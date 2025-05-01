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
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className={`p-6 ${stat.color} border-0`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-80">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Aqui você pode adicionar mais seções como:
           * - Gráficos de desempenho
           * - Lista de atividades recentes
           * - Grupos mais populares
           * - etc.
           */}
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  );
};

export default AdminDashboard; 