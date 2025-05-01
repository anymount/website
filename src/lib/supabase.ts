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
      link: 'https://t.me/asdanadas_free',
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

export interface Review {
  user_name: string;
  rating: number;
  comment?: string;
}

export interface Group {
  id: string;
  created_at: string;
  name: string;
  description: string;
  members: number;
  price: number;
  image_url: string;
  link: string;
  active: boolean;
  featured: boolean;
  category: string;
  rating: number;
}

export interface Purchase {
  id: string;
  created_at: string;
  user_id: string;
  group_id: string;
  status: 'pending' | 'completed' | 'failed';
  payment_intent?: string;
  amount: number;
  group?: Group;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  role: 'user' | 'admin';
}

// Tipos para as tabelas do Supabase
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