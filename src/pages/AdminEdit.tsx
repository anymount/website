import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import { useGroup, useCreateGroup, useUpdateGroup } from '@/hooks/useGroups';
import { Loader2, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Group } from '@/lib/supabase';

const AdminEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewGroup = id === 'new';
  const { toast } = useToast();
  const { data: group, isLoading } = useGroup(isNewGroup ? '' : id || '');
  const createGroup = useCreateGroup();
  const updateGroup = useUpdateGroup();
  
  const [formData, setFormData] = useState<Partial<Group>>({
    name: '',
    description: '',
    long_description: '',
    members: 0,
    price: 0,
    image_url: '',
    category: '',
    telegram_link: '',
    active: true,
    content_count: ''
  });

  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isNewGroup && group) {
      setFormData(group);
    }
  }, [group, isNewGroup]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let processedValue: string | number | boolean = value;
    
    if (name === 'members' || name === 'price') {
      processedValue = value === '' ? 0 : Number(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erro",
        description: "Por favor, envie apenas arquivos de imagem.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Converter a imagem para base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        const base64Image = reader.result as string;
        
        setFormData(prev => ({
          ...prev,
          image_url: base64Image
        }));

        toast({
          title: "Sucesso",
          description: "Imagem carregada com sucesso!",
        });
      };

      reader.onerror = (error) => {
        throw new Error('Erro ao ler o arquivo');
      };
    } catch (error: any) {
      console.error('Erro no upload:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar imagem: " + (error.message || 'Erro desconhecido'),
        variant: "destructive"
      });
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Remover campos que não devem ser enviados ao Supabase
      const { group_features, group_reviews, created_at, id: groupId, ...groupData } = formData as any;

      if (isNewGroup) {
        await createGroup.mutateAsync(groupData);
        toast({
          title: "Sucesso",
          description: "Grupo criado com sucesso!",
        });
      } else {
        await updateGroup.mutateAsync({ id, ...groupData });
        toast({
          title: "Sucesso",
          description: "Grupo atualizado com sucesso!",
        });
      }
      
      navigate('/admin');
    } catch (error: any) {
      console.error('Erro ao salvar:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao salvar grupo",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <AdminAuthGuard>
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-8">
            {isNewGroup ? 'Adicionar novo grupo' : 'Editar grupo'}
          </h1>
          
          <div className="bg-card border border-adult-purple border-opacity-20 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Nome do grupo
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nome do grupo"
                      className="border-adult-purple bg-adult-dark/50 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                      Categoria
                    </label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="Categoria"
                      className="border-adult-purple bg-adult-dark/50 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="members" className="block text-sm font-medium text-gray-300 mb-1">
                      Número de membros
                    </label>
                    <Input
                      id="members"
                      name="members"
                      type="number"
                      value={formData.members}
                      onChange={handleInputChange}
                      placeholder="Número de membros"
                      className="border-adult-purple bg-adult-dark/50 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                      Preço (R$)
                    </label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Preço"
                      className="border-adult-purple bg-adult-dark/50 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="telegram_link" className="block text-sm font-medium text-gray-300 mb-1">
                      Link do Telegram
                    </label>
                    <Input
                      id="telegram_link"
                      name="telegram_link"
                      value={formData.telegram_link}
                      onChange={handleInputChange}
                      placeholder="Link do grupo no Telegram"
                      className="border-adult-purple bg-adult-dark/50 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Imagem do grupo
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                        ${isDragging 
                          ? 'border-adult-accent bg-adult-accent/10' 
                          : 'border-adult-purple hover:border-adult-accent'
                        }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={handleFileSelect}
                    >
                      {formData.image_url ? (
                        <div className="relative">
                          <img
                            src={formData.image_url}
                            alt="Preview"
                            className="max-h-40 mx-auto rounded"
                          />
                          <p className="mt-2 text-sm text-gray-400">
                            Clique ou arraste uma nova imagem para substituir
                          </p>
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <Upload className="w-8 h-8 mx-auto mb-2" />
                          <p>Arraste uma imagem aqui</p>
                          <p className="text-sm">ou clique para selecionar</p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                      Descrição curta
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Breve descrição do grupo"
                      className="border-adult-purple bg-adult-dark/50 text-white h-20"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="long_description" className="block text-sm font-medium text-gray-300 mb-1">
                      Descrição completa
                    </label>
                    <Textarea
                      id="long_description"
                      name="long_description"
                      value={formData.long_description}
                      onChange={handleInputChange}
                      placeholder="Descrição detalhada do grupo"
                      className="border-adult-purple bg-adult-dark/50 text-white h-32"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-adult-purple text-white"
                  onClick={() => navigate('/admin')}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-adult-accent hover:bg-adult-magenta text-white"
                  disabled={createGroup.isPending || updateGroup.isPending}
                >
                  {(createGroup.isPending || updateGroup.isPending) ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  {isNewGroup ? 'Criar grupo' : 'Atualizar grupo'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </MainLayout>
    </AdminAuthGuard>
  );
};

export default AdminEdit;
