import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, Shield } from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar mudança de senha
    toast({
      title: "Em desenvolvimento",
      description: "Funcionalidade será implementada em breve.",
    });
  };

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Configurações</h2>

          <div className="grid gap-6">
            {/* Segurança */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-500">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Segurança</h3>
                  <p className="text-sm text-gray-400">Gerencie suas credenciais de acesso</p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Senha Atual</label>
                  <Input type="password" placeholder="Digite sua senha atual" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nova Senha</label>
                  <Input type="password" placeholder="Digite a nova senha" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Confirmar Nova Senha</label>
                  <Input type="password" placeholder="Confirme a nova senha" />
                </div>
                <Button type="submit">Alterar Senha</Button>
              </form>
            </Card>

            {/* Notificações por Email */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Notificações por Email</h3>
                  <p className="text-sm text-gray-400">Configure suas preferências de email</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Novos Grupos</p>
                    <p className="text-sm text-gray-400">Receba notificações quando novos grupos forem criados</p>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Relatórios</p>
                    <p className="text-sm text-gray-400">Receba relatórios semanais de atividade</p>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>
              </div>
            </Card>

            {/* Permissões */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Permissões</h3>
                  <p className="text-sm text-gray-400">Gerencie as permissões do sistema</p>
                </div>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Gerenciar Funções de Usuário
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Configurar Permissões de Acesso
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Logs de Atividade
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  );
};

export default AdminSettings; 