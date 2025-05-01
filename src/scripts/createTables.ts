import { supabase } from '../lib/supabase';

const createTables = async () => {
  console.log('Criando tabelas no Supabase...');

  try {
    // Criar tabela de grupos
    console.log('Criando tabela groups...');
    const { error: groupsError } = await supabase.from('groups').rpc('create_tables', {
      sql: `
        CREATE TABLE IF NOT EXISTS groups (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR NOT NULL,
          description TEXT NOT NULL,
          long_description TEXT,
          members INTEGER DEFAULT 0,
          price DECIMAL(10,2) NOT NULL,
          image_url TEXT,
          category VARCHAR NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          content_count TEXT,
          telegram_link TEXT NOT NULL,
          active BOOLEAN DEFAULT true
        );

        CREATE TABLE IF NOT EXISTS group_features (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
          feature TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS group_reviews (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
          user_name VARCHAR NOT NULL,
          rating INTEGER CHECK (rating >= 1 AND rating <= 5),
          comment TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS categories (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR NOT NULL,
          description TEXT,
          image_url TEXT,
          active BOOLEAN DEFAULT true
        );
      `
    });

    if (groupsError) {
      console.error('Erro ao criar tabelas:', groupsError);
      return;
    }

    console.log('Todas as tabelas foram criadas com sucesso!');
  } catch (error) {
    console.error('Erro durante a criação das tabelas:', error);
    if (error.message) console.error('Mensagem de erro:', error.message);
    if (error.details) console.error('Detalhes do erro:', error.details);
  }
};

createTables(); 