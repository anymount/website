import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useCreateGroup, useUpdateGroup } from '@/hooks/useGroups';
import { supabase } from '@/lib/supabase';
import type { Group } from '@/lib/supabase';
import { Loader2, Upload } from 'lucide-react';

const BUCKET_NAME = 'groups';

const groupSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  long_description: z.string().optional(),
  category: z.string().min(1, 'Categoria é obrigatória'),
  image_url: z.string(),
  members: z.coerce.number().min(0, 'Número de membros deve ser positivo'),
  price: z.coerce.number().min(0, 'Preço deve ser positivo'),
  content_count: z.string().optional(),
  telegram_link: z.string().url('URL do Telegram inválida'),
  active: z.boolean().default(true),
  rating: z.coerce.number().min(0, 'Nota deve ser entre 0 e 5').max(5, 'Nota deve ser entre 0 e 5').default(0),
});

type GroupFormData = z.infer<typeof groupSchema>;

interface GroupFormProps {
  group?: Group;
}

const GroupForm = ({ group }: GroupFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const createGroup = useCreateGroup();
  const updateGroup = useUpdateGroup();
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(group?.image_url || '');

  const form = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: group?.name || '',
      description: group?.description || '',
      long_description: group?.long_description || '',
      category: group?.category || '',
      image_url: group?.image_url || '',
      members: group?.members || 0,
      price: group?.price || 0,
      content_count: group?.content_count || '',
      telegram_link: group?.telegram_link || '',
      active: group?.active ?? true,
      rating: group?.rating || 0,
    },
  });

  useEffect(() => {
    if (group) {
      form.reset({
        name: group.name,
        description: group.description,
        members: group.members,
        price: group.price,
        rating: group.rating,
        image_url: group.image_url,
        link: group.link,
        active: group.active,
        featured: group.featured,
        category: group.category
      });
      setPreviewUrl(group.image_url);
    }
  }, [group, form]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Validações básicas
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erro",
          description: "Por favor, selecione uma imagem válida (JPG, PNG, etc)",
          variant: "destructive"
        });
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Erro",
          description: "A imagem deve ter no máximo 2MB",
          variant: "destructive"
        });
        return;
      }

      // Verificar autenticação
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para fazer upload de imagens",
          variant: "destructive"
        });
        return;
      }

      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      // Tentar fazer o upload
      const { error: uploadError, data } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Erro no upload:', uploadError);
        
        // Se o erro for de bucket não encontrado
        if (uploadError.message.includes('bucket') || uploadError.message.includes('Bucket')) {
          toast({
            title: "Erro - Bucket não encontrado",
            description: `Para configurar o upload de imagens:
1. Acesse o Supabase Dashboard
2. Vá em "Storage"
3. Clique em "New Bucket"
4. Digite "groups" como nome
5. Marque "Public bucket"
6. Clique em "Create bucket"
7. Na aba "Policies", adicione as políticas:

-- Para leitura pública
CREATE POLICY "Permitir leitura pública"
ON storage.objects FOR SELECT
USING (bucket_id = 'groups');

-- Para upload autenticado
CREATE POLICY "Permitir upload autenticado"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'groups' AND auth.role() = 'authenticated');`,
            variant: "destructive"
          });
          return;
        }
        
        // Se for erro de permissão
        if (uploadError.message.includes('permission')) {
          toast({
            title: "Erro de permissão",
            description: "Verifique se as políticas do bucket estão configuradas corretamente",
            variant: "destructive"
          });
          return;
        }

        toast({
          title: "Erro",
          description: "Erro ao fazer upload da imagem",
          variant: "destructive"
        });
        return;
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(data?.path || '');

      // Atualizar formulário
      form.setValue('image_url', publicUrl);
      setPreviewUrl(publicUrl);

      toast({
        title: "Sucesso",
        description: "Imagem enviada com sucesso",
      });

    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao fazer upload da imagem",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: GroupFormData) => {
    try {
      setIsLoading(true);

      const groupData = {
        name: data.name,
        description: data.description,
        members: Number(data.members),
        price: Number(data.price),
        rating: Number(data.rating),
        image_url: data.image_url,
        link: data.link,
        active: data.active,
        featured: data.featured,
        category: data.category
      };

      if (group) {
        await updateGroup.mutateAsync({ id: group.id, ...groupData });
        toast({
          title: "Sucesso",
          description: "Grupo atualizado com sucesso",
        });
      } else {
        await createGroup.mutateAsync(groupData);
        toast({
          title: "Sucesso",
          description: "Grupo criado com sucesso",
        });
      }

      navigate('/admin/groups');
    } catch (error) {
      console.error('Erro ao salvar grupo:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar grupo. Verifique os dados e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Grupo</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do grupo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Input placeholder="Categoria do grupo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="members"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Membros</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço (R$)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade de Conteúdo</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: +1000 fotos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nota do Grupo (0-5)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.1" 
                    min="0" 
                    max="5" 
                    placeholder="4.7" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telegram_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link do Telegram</FormLabel>
                <FormControl>
                  <Input placeholder="https://t.me/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição Curta</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição breve do grupo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="long_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição Longa</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição detalhada do grupo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Imagem do Grupo</FormLabel>
            <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('image-upload')?.click()}>
              {isUploading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              Upload
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          {previewUrl && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain bg-gray-800"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/groups')}
          >
            Cancelar
          </Button>
          <Button type="submit">
            {group ? 'Atualizar' : 'Criar'} Grupo
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GroupForm; 