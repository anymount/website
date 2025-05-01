import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import ChangePasswordDialog from '@/components/admin/ChangePasswordDialog';
import { useGroups, useDeleteGroup } from '@/hooks/useGroups';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import NotificationsManager from '@/components/admin/NotificationsManager';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: groups, isLoading } = useGroups();
  const deleteGroup = useDeleteGroup();

  // Filter groups based on search term
  const filteredGroups = groups?.filter(
    group => 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este grupo?')) {
      try {
        await deleteGroup.mutateAsync(id);
        toast({
          title: "Sucesso",
          description: "Grupo excluído com sucesso.",
        });
      } catch (error) {
        console.error('Erro ao excluir grupo:', error);
        toast({
          title: "Erro",
          description: "Erro ao excluir grupo",
          variant: "destructive"
        });
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Tem certeza que deseja excluir TODOS os grupos? Esta ação não pode ser desfeita!')) {
      try {
        const { error } = await supabase
          .from('groups')
          .delete()
          .not('id', 'is', null);
        
        if (error) throw error;
        
        toast({
          title: "Sucesso",
          description: "Todos os grupos foram excluídos com sucesso.",
        });
        
        // Recarrega a página para atualizar a lista
        window.location.reload();
      } catch (error: any) {
        console.error('Erro ao excluir grupos:', error);
        toast({
          title: "Erro",
          description: "Erro ao excluir grupos: " + (error.message || 'Erro desconhecido'),
          variant: "destructive"
        });
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    toast({
      title: "Logout",
      description: "Você foi desconectado do painel de administração.",
    });
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <MainLayout>
      <AdminAuthGuard>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <NotificationsManager />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Gerenciar Grupos</h1>
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Buscar grupos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Link to="/admin/edit/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Grupo
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Administração de Grupos</h1>
            
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <Input
                placeholder="Buscar grupos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-adult-purple bg-adult-dark/50 text-white placeholder:text-gray-500"
              />
              
              <Button
                variant="destructive"
                onClick={handleDeleteAll}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir Todos os Grupos
              </Button>
              
              <Link to="/admin/edit/new">
                <Button className="bg-adult-accent hover:bg-adult-magenta text-white w-full md:w-auto">
                  <Plus className="h-4 w-4 mr-2" /> 
                  Novo Grupo
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-card border border-adult-purple border-opacity-20 rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-adult-purple border-opacity-30">
                    <TableHead className="text-adult-accent">ID</TableHead>
                    <TableHead className="text-adult-accent">Nome</TableHead>
                    <TableHead className="text-adult-accent">Categoria</TableHead>
                    <TableHead className="text-adult-accent">Membros</TableHead>
                    <TableHead className="text-adult-accent">Preço</TableHead>
                    <TableHead className="text-adult-accent text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGroups.map((group) => (
                    <TableRow key={group.id} className="border-adult-purple border-opacity-10">
                      <TableCell className="font-medium text-gray-300">{group.id}</TableCell>
                      <TableCell className="text-white">{group.name}</TableCell>
                      <TableCell className="text-gray-300">{group.category}</TableCell>
                      <TableCell className="text-gray-300">{group.members.toLocaleString()}</TableCell>
                      <TableCell className="text-adult-accent">R${group.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Link to={`/admin/edit/${group.id}`}>
                            <Button size="sm" variant="outline" className="border-adult-purple text-adult-accent hover:bg-adult-purple hover:text-white">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => handleDelete(group.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredGroups.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                        Nenhum grupo encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="space-x-4">
              <ChangePasswordDialog />
              <Button 
                variant="outline" 
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                onClick={handleLogout}
              >
                Sair
              </Button>
            </div>
            <div className="text-right text-gray-400 text-sm">
              <p>Painel de Administração</p>
            </div>
          </div>
        </div>
      </AdminAuthGuard>
    </MainLayout>
  );
};

export default Admin;
