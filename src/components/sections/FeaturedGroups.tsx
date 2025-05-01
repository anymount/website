import React from 'react';
import { useGroups } from '@/hooks/useGroups';
import GroupCard from '@/components/GroupCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const FeaturedGroups = () => {
  const { data: groups, isLoading } = useGroups();

  return (
    <section className="bg-adult-dark py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Grupos em Destaque</h2>
            <p className="text-gray-400">Os grupos mais populares da nossa plataforma</p>
          </div>
          <Link to="/groups" className="mt-4 md:mt-0">
            <Button variant="outline" className="border-adult-purple text-white hover:bg-adult-purple">
              Ver Todos os Grupos
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-adult-accent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {groups?.slice(0, 4).map((group) => (
              <GroupCard key={group.id} {...group} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedGroups;
