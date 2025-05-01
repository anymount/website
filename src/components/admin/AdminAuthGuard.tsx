
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

const AdminAuthGuard = ({ children }: AdminAuthGuardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdminLoggedIn') === 'true';
    
    if (!isAdmin) {
      toast({
        title: "Acesso negado",
        description: "Você precisa fazer login como administrador para acessar esta página.",
        variant: "destructive"
      });
      navigate('/admin-login');
    }
  }, [navigate, toast]);

  return <>{children}</>;
};

export default AdminAuthGuard;
