import React, { useState } from 'react';
import { useNotifications, useCreateNotification, useUpdateNotification, type Notification } from '@/hooks/useNotifications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash2, Edit2 } from 'lucide-react';

const NotificationsManager = () => {
  const { data: notifications, isLoading } = useNotifications();
  const createNotification = useCreateNotification();
  const updateNotification = useUpdateNotification();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Notification>>({
    title: '',
    message: '',
    type: 'info',
    active: true,
    link: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (formData.id) {
        await updateNotification.mutateAsync(formData as Required<Pick<Notification, 'id'>> & Partial<Notification>);
        toast({
          title: 'Sucesso',
          description: 'Notificação atualizada com sucesso!',
        });
      } else {
        await createNotification.mutateAsync(formData as Omit<Notification, 'id' | 'created_at'>);
        toast({
          title: 'Sucesso',
          description: 'Notificação criada com sucesso!',
        });
      }
      
      setFormData({
        title: '',
        message: '',
        type: 'info',
        active: true,
        link: '',
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao salvar notificação',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (notification: Notification) => {
    setFormData(notification);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta notificação?')) return;
    
    try {
      await updateNotification.mutateAsync({ id, active: false });
      toast({
        title: 'Sucesso',
        description: 'Notificação excluída com sucesso!',
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao excluir notificação',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gerenciar Notificações</h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Notificação
          </Button>
        )}
      </div>

      {isEditing && (
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <Input
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Digite o título da notificação"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mensagem</label>
              <Textarea
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Digite a mensagem da notificação"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <Select
                value={formData.type}
                onValueChange={value => setFormData(prev => ({ ...prev, type: value as Notification['type'] }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Informação</SelectItem>
                  <SelectItem value="warning">Aviso</SelectItem>
                  <SelectItem value="success">Sucesso</SelectItem>
                  <SelectItem value="error">Erro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Link (opcional)</label>
              <Input
                value={formData.link || ''}
                onChange={e => setFormData(prev => ({ ...prev, link: e.target.value }))}
                placeholder="Digite o link relacionado"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    title: '',
                    message: '',
                    type: 'info',
                    active: true,
                    link: '',
                  });
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {formData.id ? 'Atualizar' : 'Criar'} Notificação
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {notifications?.filter(n => n.active).map(notification => (
          <Card key={notification.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{notification.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                {notification.link && (
                  <a href={notification.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline mt-1 block">
                    {notification.link}
                  </a>
                )}
                <span className="inline-block px-2 py-1 text-xs rounded-full mt-2" style={{
                  backgroundColor: notification.type === 'info' ? 'rgba(59, 130, 246, 0.1)' :
                    notification.type === 'warning' ? 'rgba(245, 158, 11, 0.1)' :
                    notification.type === 'success' ? 'rgba(34, 197, 94, 0.1)' :
                    'rgba(239, 68, 68, 0.1)',
                  color: notification.type === 'info' ? 'rgb(59, 130, 246)' :
                    notification.type === 'warning' ? 'rgb(245, 158, 11)' :
                    notification.type === 'success' ? 'rgb(34, 197, 94)' :
                    'rgb(239, 68, 68)',
                }}>
                  {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit(notification)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(notification.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationsManager; 