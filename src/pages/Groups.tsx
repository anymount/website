import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import GroupCard from '@/components/GroupCard';
import { Button } from '@/components/ui/button';
import { useGroups } from '@/hooks/useGroups';
import { Loader2 } from 'lucide-react';

const Groups = () => {
  const { data: groups, isLoading, error } = useGroups();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-red-500 mb-4">Erro ao carregar os grupos</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Tentar novamente
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-adult-dark py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Todos os grupos Telegram</h1>
              <p className="text-gray-400">Explore nossa coleção de grupos Telegram premium para adultos</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {groups?.map((group) => (
              <GroupCard key={group.id} {...group} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/">
              <Button className="bg-adult-accent hover:bg-adult-magenta text-white">
                Voltar ao início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Groups;
