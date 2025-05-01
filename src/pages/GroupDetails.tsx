import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGroup } from '@/hooks/useGroups';
import { Users, Calendar, Star } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const GroupDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: group, isLoading } = useGroup(id || '');

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-adult-accent" />
        </div>
      </MainLayout>
    );
  }

  if (!group) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Grupo não encontrado</h1>
            <Link to="/groups">
              <Button>Voltar para Grupos</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da Imagem */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={group.image_url || "/placeholder.svg"}
                  alt={group.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-adult-purple">
                  {group.category}
                </Badge>
              </div>
            </Card>
          </div>

          {/* Coluna das Informações */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{group.name}</h1>
              <p className="text-gray-400 text-lg">{group.description}</p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-adult-accent" />
                  <div>
                    <p className="text-sm text-gray-400">Membros</p>
                    <p className="text-lg font-bold">{group.members.toLocaleString()}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-adult-accent" />
                  <div>
                    <p className="text-sm text-gray-400">Criado em</p>
                    <p className="text-lg font-bold">
                      {new Date(group.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-adult-accent" />
                  <div>
                    <p className="text-sm text-gray-400">Avaliação</p>
                    <p className="text-lg font-bold">
                      {group.rating ? group.rating.toFixed(1) : 'N/A'}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Preço e Ação */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Preço</p>
                  <p className="text-3xl font-bold text-adult-accent">
                    {group.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                </div>
                <a 
                  href={group.telegram_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-adult-accent hover:bg-adult-purple">
                    Entrar no Grupo
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GroupDetails; 