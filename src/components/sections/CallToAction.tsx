import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="bg-adult-dark py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para Acessar Conteúdo Premium?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Junte-se a milhares de usuários que já estão aproveitando nossos grupos exclusivos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/groups">
              <Button size="lg" className="bg-adult-accent hover:bg-adult-magenta text-white">
                Explorar Grupos
              </Button>
            </Link>
            <Link to="/categories">
              <Button size="lg" variant="outline" className="border-adult-purple text-white hover:bg-adult-purple">
                Ver Categorias
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
