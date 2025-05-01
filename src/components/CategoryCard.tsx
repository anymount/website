
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  name: string;
  count: number;
  iconUrl: string;
  slug: string;
}

const CategoryCard = ({ name, count, iconUrl, slug }: CategoryCardProps) => {
  return (
    <Link to={`/categories/${slug}`}>
      <Card className="group-card bg-card border border-adult-purple border-opacity-20 hover:border-opacity-40">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 text-adult-accent">
            {iconUrl ? (
              <img src={iconUrl} alt={name} className="w-full h-full" />
            ) : (
              <div className="w-full h-full rounded-full bg-adult-purple bg-opacity-20 flex items-center justify-center">
                <span className="text-2xl font-bold">{name[0]}</span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
          <p className="text-sm text-gray-400">{count} groups</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
