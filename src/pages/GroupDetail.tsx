import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, ArrowLeft, Send, Loader2 } from 'lucide-react';
import { useGroup } from '@/hooks/useGroups';

const GroupDetail = () => {
  const { id } = useParams();
  const { data: group, isLoading, error } = useGroup(id || '');

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </MainLayout>
    );
  }

  // Handle case where group doesn't exist
  if (!group || error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Grupo não encontrado</h1>
          <p className="text-gray-400 mb-8">O grupo que você procura não existe ou foi removido.</p>
          <Link to="/groups">
            <Button className="bg-adult-accent hover:bg-adult-purple text-white">
              Voltar aos grupos
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link to="/groups" className="inline-flex items-center text-adult-accent hover:text-adult-magenta mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar aos grupos
        </Link>

        {/* Group Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Group Image */}
          <div className="lg:col-span-1">
            <div className="relative aspect-square rounded-lg overflow-hidden border border-adult-purple border-opacity-30">
              <div className="absolute top-3 right-3 z-10">
                <span className="badge-18">18+</span>
              </div>
              <img 
                src={group.image_url || "/placeholder.svg"} 
                alt={group.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Group Info */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-adult-purple">{group.category}</Badge>
              <div className="flex items-center text-sm text-gray-400 bg-adult-dark/50 px-2 py-1 rounded">
                <Users className="h-3 w-3 mr-1" />
                <span>{group.members.toLocaleString()} membros</span>
              </div>
              <div className="flex items-center text-sm text-gray-400 bg-adult-dark/50 px-2 py-1 rounded">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Desde {new Date(group.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">{group.name}</h1>
            
            <p className="text-gray-300 mb-6">{group.long_description || group.description}</p>
            
            <div className="flex flex-wrap gap-4 items-center mb-8">
              <span className="text-3xl font-bold text-adult-accent">R${group.price.toFixed(2)}</span>
              <a href={group.telegram_link} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-adult-accent hover:bg-adult-magenta text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Comprar no Telegram
                </Button>
              </a>
            </div>
            
            {group.content_count && (
              <div className="bg-adult-dark/40 border border-adult-purple border-opacity-20 rounded-lg p-4">
                <div className="font-medium text-white mb-2">O que você receberá:</div>
                <div className="text-gray-300">{group.content_count}</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Tabs for additional info */}
        <Tabs defaultValue="features" className="mb-10">
          <TabsList className="bg-adult-dark border border-adult-purple border-opacity-20">
            <TabsTrigger value="features">Características</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="bg-card border border-adult-purple border-opacity-20 rounded-lg mt-4 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Características do grupo</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.group_features?.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 mt-1 flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-adult-accent bg-opacity-20">
                    <div className="w-1.5 h-1.5 rounded-full bg-adult-accent"></div>
                  </div>
                  <span className="text-gray-300">{feature.feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="reviews" className="bg-card border border-adult-purple border-opacity-20 rounded-lg mt-4 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Avaliações dos membros</h3>
            <div className="space-y-4">
              {group.group_reviews?.map((review) => (
                <Card key={review.id} className="bg-adult-dark border border-adult-purple border-opacity-20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{review.user_name}</span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`text-sm ${i < review.rating ? 'text-adult-accent' : 'text-gray-600'}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}

              {(!group.group_reviews || group.group_reviews.length === 0) && (
                <div className="text-center text-gray-400 py-4">
                  Ainda não há avaliações para este grupo
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Call to action */}
        <div className="text-center p-6 md:p-10 bg-adult-dark border border-adult-purple border-opacity-20 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-3">Pronto para entrar em {group.name}?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Junte-se a {group.members.toLocaleString()} membros que já estão aproveitando este grupo premium.
          </p>
          <a href={group.telegram_link} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-adult-accent hover:bg-adult-magenta text-white">
              <Send className="h-4 w-4 mr-2" />
              Comprar no Telegram
            </Button>
          </a>
        </div>
      </div>
    </MainLayout>
  );
};

export default GroupDetail;
