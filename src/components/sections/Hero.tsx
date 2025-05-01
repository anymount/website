import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-adult-dark text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Acesso Premium a Grupos <span className="text-adult-accent">Telegram</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Explore nossa coleção exclusiva de grupos Telegram para adultos. 
            Conteúdo premium, atualizações diárias e acesso vitalício.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/groups">
              <Button size="lg" className="bg-adult-accent hover:bg-adult-magenta text-white">
                Ver Grupos
              </Button>
            </Link>
            <Link to="/categories">
              <Button size="lg" variant="outline" className="border-adult-purple text-white hover:bg-adult-purple">
                Explorar Categorias
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
