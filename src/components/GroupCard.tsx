import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

interface GroupCardProps {
  id: string;
  name: string;
  description: string;
  members: number;
  price: number;
  image_url: string;
  category: string;
}

const GroupCard = ({ id, name, description, members, price, image_url, category }: GroupCardProps) => {
  return (
    <Link to={`/groups/${id}`}>
      <Card className="group-card bg-card h-full border border-adult-purple border-opacity-20 hover:border-opacity-40">
        <div className="aspect-video w-full relative overflow-hidden">
          <div className="absolute top-2 right-2 z-10">
            <span className="badge-18">18+</span>
          </div>
          <img 
            src={image_url || "/placeholder.svg"} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <div className="flex justify-between items-center">
              <Badge className="bg-adult-purple/80 hover:bg-adult-purple">{category}</Badge>
              <div className="flex items-center text-white text-xs">
                <Users className="h-3 w-3 mr-1" />
                <span>{members.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-1 text-white">{name}</h3>
          <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0 justify-between items-center">
          <span className="price-tag">${price.toFixed(2)}</span>
          <Button size="sm" className="bg-adult-accent hover:bg-adult-purple text-white">
            Ver Detalhes
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default GroupCard;
