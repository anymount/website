import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';
import NotificationBell from '@/components/notifications/NotificationBell';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup } from '@/components/ui/command';
import { useGroups } from '@/hooks/useGroups';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { data: groups } = useGroups();

  return (
    <header className="sticky top-0 z-50 bg-adult-dark border-b border-adult-purple border-opacity-20 shadow-lg backdrop-blur-md bg-opacity-90">
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Buscar grupos por nome ou categoria..." />
        <CommandList>
          <CommandEmpty>Nenhum grupo encontrado.</CommandEmpty>
          <CommandGroup heading="Grupos">
            {groups && groups.length > 0 && groups.map(group => (
              <Link
                key={group.id}
                to={`/groups/${group.id}`}
                onClick={() => setSearchOpen(false)}
                className="block px-4 py-2 hover:bg-adult-purple hover:bg-opacity-20 rounded cursor-pointer"
              >
                <span className="font-semibold text-white">{group.name}</span>
                <span className="ml-2 text-xs text-gray-400">{group.category}</span>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-adult-accent">As<span className="text-white">mode</span><span className="text-adult-magenta">los</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-adult-accent transition-colors">Início</Link>
            <Link to="/groups" className="text-white hover:text-adult-accent transition-colors">Grupos</Link>
            <Link to="/terms" className="text-white hover:text-adult-accent transition-colors">Termos</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <NotificationBell />
            <Button variant="outline" size="sm" className="border-adult-purple text-adult-purple hover:bg-adult-purple hover:text-white" onClick={() => setSearchOpen(true)}>
              <Search className="h-4 w-4 mr-2" />
              Pesquisar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <NotificationBell />
            <button 
              className="flex items-center p-2 rounded-md text-white hover:bg-adult-purple hover:bg-opacity-20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-adult-dark border-b border-adult-purple border-opacity-20">
          <div className="container mx-auto px-4 py-3 space-y-1">
            <Link to="/" className="block p-2 text-white hover:bg-adult-purple hover:bg-opacity-20 rounded">Início</Link>
            <Link to="/groups" className="block p-2 text-white hover:bg-adult-purple hover:bg-opacity-20 rounded">Grupos</Link>
            <Link to="/terms" className="block p-2 text-white hover:bg-adult-purple hover:bg-opacity-20 rounded">Termos</Link>
            <Button variant="outline" size="sm" className="border-adult-purple text-adult-purple hover:bg-adult-purple hover:text-white w-full mt-2" onClick={() => setSearchOpen(true)}>
              <Search className="h-4 w-4 mr-2" />
              Pesquisar
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
