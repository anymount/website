import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Clock, Users, Star } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Pagamento Seguro',
    description: 'Todas as transações são processadas de forma segura e criptografada'
  },
  {
    icon: Clock,
    title: 'Acesso Instantâneo',
    description: 'Receba o link de acesso imediatamente após a confirmação do pagamento'
  },
  {
    icon: Users,
    title: 'Suporte 24/7',
    description: 'Nossa equipe está sempre disponível para ajudar com qualquer dúvida'
  },
  {
    icon: Star,
    title: 'Conteúdo Premium',
    description: 'Acesso a conteúdo exclusivo e de alta qualidade atualizado diariamente'
  }
];

const FeaturesList = () => {
  return (
    <section className="bg-adult-dark py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Por que Escolher a Asmodelos</h2>
          <p className="text-gray-400">Oferecemos a melhor experiência para nossos usuários</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border border-adult-purple border-opacity-20">
              <div className="p-6">
                <div className="w-12 h-12 bg-adult-accent rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;
