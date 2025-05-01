import React from 'react';
import { Card } from '@/components/ui/card';
import { Search, CreditCard, MessageCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Encontre seu Grupo',
    description: 'Navegue por nossa seleção de grupos premium e escolha o que mais combina com você'
  },
  {
    icon: CreditCard,
    title: 'Faça o Pagamento',
    description: 'Realize o pagamento de forma segura através dos nossos métodos disponíveis'
  },
  {
    icon: MessageCircle,
    title: 'Acesse o Grupo',
    description: 'Receba o link de acesso instantaneamente após a confirmação do pagamento'
  }
];

const HowItWorks = () => {
  return (
    <section className="bg-adult-dark py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Como Funciona</h2>
          <p className="text-gray-400">Processo simples e rápido para acessar os grupos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-card border border-adult-purple border-opacity-20">
              <div className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-adult-accent rounded-full flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
