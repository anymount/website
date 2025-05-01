import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Salvar a sessão
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        sessionStorage.setItem('adminUser', JSON.stringify(data.user));
        
        toast.success('Login realizado com sucesso!');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Erro de login:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-adult-dark p-4">
      <Card className="w-full max-w-md bg-card p-8 border border-adult-purple border-opacity-20">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Painel de Administração</h1>
          <p className="text-gray-400">Digite suas credenciais para acessar o painel</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-adult-dark/30 text-white border-adult-purple border-opacity-40"
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-adult-dark/30 text-white border-adult-purple border-opacity-40"
              placeholder="Digite sua senha"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-adult-accent hover:bg-adult-magenta text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Entre em contato com o administrador se você não tiver acesso.</p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
