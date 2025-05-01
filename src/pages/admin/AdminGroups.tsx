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
import { Card } from '@/components/ui/card';

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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">Gerenciar Grupos</h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Input
                type="text"
                placeholder="Buscar grupos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
              <Link to="/admin/groups/new" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Grupo
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabela para Desktop */}
          <div className="hidden md:block bg-gray-700/50 rounded-lg overflow-hidden">
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
                    <TableCell>R$ {group.price}</TableCell>
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

          {/* Cards para Mobile */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="p-4 bg-gray-700/50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-white">{group.name}</h3>
                    <p className="text-sm text-gray-300">{group.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/admin/groups/${group.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(group.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-400">Membros</p>
                    <p className="text-white">{group.members}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Preço</p>
                    <p className="text-white">R$ {group.price}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  );
};

export default AdminGroups; 