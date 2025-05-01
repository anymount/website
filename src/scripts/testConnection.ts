import { supabase } from '../lib/supabase';

const testConnection = async () => {
  console.log('Testando conexão com o Supabase...');
  console.log('URL:', process.env.VITE_SUPABASE_URL);
  
  try {
    const { data, error } = await supabase.from('groups').select('count');
    
    if (error) {
      console.error('Erro ao conectar:', error);
      return;
    }
    
    console.log('Conexão estabelecida com sucesso!');
    console.log('Dados recebidos:', data);
  } catch (error) {
    console.error('Erro durante o teste:', error);
  }
};

testConnection(); 