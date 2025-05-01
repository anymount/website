import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltam variáveis de ambiente do Supabase');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para criar uma notificação de teste
export const createTestNotification = async () => {
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      title: '✨ Bem-vindo ao Asmodelos!',
      message: 'Descubra os melhores grupos premium do Telegram. Aproveite nossos preços especiais de lançamento! 🔥',
      link: 'https://t.me/asmodelos',
      type: 'info',
      active: true
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar notificação de teste:', error);
    throw error;
  }

  return data;
};

// Tipos para as tabelas do Supabase
export type Group = {
  id: string;
  name: string;
  description: string;
  long_description?: string;
  members: number;
  price: number;
  image_url: string;
  category: string;
  created_at: string;
  content_count?: string;
  telegram_link: string;
  active: boolean;
  group_features?: GroupFeature[];
  group_reviews?: GroupReview[];
};

export type GroupFeature = {
  id: string;
  group_id: string;
  feature: string;
};

export type GroupReview = {
  id: string;
  group_id: string;
  user_name: string;
  rating: number;
  comment?: string;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  active: boolean;
}; 