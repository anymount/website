import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useGroups, useDeleteGroup } from '@/hooks/useGroups';
import { useToast } from '@/hooks/use-toast';

const AdminGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: groups, isLoading } = useGroups();
  const deleteGroup = useDeleteGroup();
  const { toast } = useToast();

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

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Gerenciar Grupos</h2>
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Buscar grupos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Link to="/admin/groups/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Grupo
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Membros</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGroups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">{group.name}</TableCell>
                    <TableCell>{group.category}</TableCell>
                    <TableCell>{group.members}</TableCell>
                    <TableCell>${group.price}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link to={`/admin/groups/${group.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(group.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  );
};

export default AdminGroups; 