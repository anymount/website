import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGroup } from '@/hooks/useGroups';
import { Users, Calendar, MessageCircle, Star } from 'lucide-react';
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                  <MessageCircle className="w-5 h-5 text-adult-accent" />
                  <div>
                    <p className="text-sm text-gray-400">Conteúdo</p>
                    <p className="text-lg font-bold">{group.content_count || 'N/A'}</p>
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
                      {group.group_reviews?.length
                        ? (group.group_reviews.reduce((acc, review) => acc + review.rating, 0) / group.group_reviews.length).toFixed(1)
                        : 'N/A'}
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

            {/* Descrição Longa */}
            {group.long_description && (
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Sobre o Grupo</h2>
                <p className="text-gray-400 whitespace-pre-line">{group.long_description}</p>
              </Card>
            )}

            {/* Avaliações */}
            {group.group_reviews && group.group_reviews.length > 0 && (
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Avaliações</h2>
                <div className="space-y-4">
                  {group.group_reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-700 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{review.user_name}</p>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-500'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-400">{review.comment}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(review.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GroupDetails; 