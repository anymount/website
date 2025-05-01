import React from 'react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'photos',
    name: 'Fotos',
    description: 'Grupos com conteúdo fotográfico exclusivo',
    icon: '📸'
  },
  {
    id: 'videos',
    name: 'Vídeos',
    description: 'Grupos com vídeos em alta qualidade',
    icon: '🎥'
  },
  {
    id: 'dating',
    name: 'Dating',
    description: 'Grupos para encontros e conexões',
    icon: '💝'
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Conteúdo premium e exclusivo',
    icon: '👑'
  }
];

const Categories = () => {
  return (
    <section className="bg-adult-dark py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Categorias</h2>
          <p className="text-gray-400">Explore nossos grupos por categoria</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/categories/${category.id}`}>
              <Card className="bg-card border border-adult-purple border-opacity-20 hover:border-opacity-40 transition-all duration-300">
                <div className="p-6 text-center">
                  <span className="text-4xl mb-4 block">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-400 text-sm">{category.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
