import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Group, CreateGroupInput, UpdateGroupInput } from '@/lib/supabase';

export const useGroups = () => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('active', true);
      
      if (error) throw error;
      return data as Group[];
    }
  });
};

export const useGroup = (id: string) => {
  return useQuery({
    queryKey: ['group', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Group;
    },
    enabled: !!id
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateGroupInput) => {
      console.log('Dados sendo enviados para criação:', input);

      const { data, error } = await supabase
        .from('groups')
        .insert(input)
        .select()
        .single();

      if (error) {
        console.error('Erro detalhado ao criar grupo:', {
          error,
          statusCode: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }

      console.log('Resposta do Supabase:', data);
      return data as Group;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
    onError: (error) => {
      console.error('Erro no mutation:', error);
    }
  });
};

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateGroupInput) => {
      const { id, ...updateData } = input;

      console.log('Dados sendo enviados para atualização:', {
        id,
        updateData
      });

      const { data, error } = await supabase
        .from('groups')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro detalhado ao atualizar grupo:', {
          error,
          statusCode: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }

      console.log('Resposta do Supabase:', data);
      return data as Group;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      queryClient.invalidateQueries({ queryKey: ['group', variables.id] });
    },
    onError: (error) => {
      console.error('Erro no mutation:', error);
    }
  });
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('groups')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    }
  });
}; 