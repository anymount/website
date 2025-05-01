import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';
import NotificationBell from '@/components/notifications/NotificationBell';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-adult-dark border-b border-adult-purple border-opacity-20 shadow-lg backdrop-blur-md bg-opacity-90">
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
            <Link to="/categories" className="text-white hover:text-adult-accent transition-colors">Categorias</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <NotificationBell />
            <Button variant="outline" size="sm" className="border-adult-purple text-adult-purple hover:bg-adult-purple hover:text-white">
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
            <Link to="/categories" className="block p-2 text-white hover:bg-adult-purple hover:bg-opacity-20 rounded">Categorias</Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" size="sm" className="border-adult-purple text-adult-purple hover:bg-adult-purple hover:text-white">
                <Search className="h-4 w-4 mr-2" />
                Pesquisar
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
