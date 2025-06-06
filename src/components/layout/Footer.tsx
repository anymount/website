import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-adult-dark border-t border-adult-purple border-opacity-20 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
          {/* Coluna 1 - Asmodelos */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Asmodelos</h3>
            <p className="text-sm text-gray-300">O melhor marketplace para grupos exclusivos de Telegram para adultos.</p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-adult-accent hover:text-adult-magenta transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="#" 
                className="text-adult-accent hover:text-adult-magenta transition-colors"
                aria-label="Telegram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295h-.014a.69.69 0 01-.49-.212l.347-3.105 5.609-5.076c.245-.204-.054-.31-.373-.106l-6.912 4.374-2.965-.924c-.657-.204-.675-.657.136-.976l11.53-4.449c.51-.18.994.106.831.818z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Links Rápidos</h4>
            <nav className="grid grid-cols-2 gap-2 text-sm">
              <Link to="/" className="text-gray-300 hover:text-adult-accent transition-colors">Início</Link>
              <Link to="/about" className="text-gray-300 hover:text-adult-accent transition-colors">Sobre Nós</Link>
              <Link to="/pricing" className="text-gray-300 hover:text-adult-accent transition-colors">Preços</Link>
              <Link to="/contact" className="text-gray-300 hover:text-adult-accent transition-colors">Contato</Link>
            </nav>
          </div>

          {/* Coluna 3 - Informações */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Informações</h4>
            <nav className="grid grid-cols-2 gap-2 text-sm">
              <Link to="/terms" className="text-gray-300 hover:text-adult-accent transition-colors">Termos de Serviço</Link>
              <Link to="/privacy" className="text-gray-300 hover:text-adult-accent transition-colors">Política de Privacidade</Link>
              <Link to="/faq" className="text-gray-300 hover:text-adult-accent transition-colors">Perguntas Frequentes</Link>
              <Link to="/support" className="text-gray-300 hover:text-adult-accent transition-colors">Suporte</Link>
              <Link to="/admin/login" className="text-gray-300 hover:text-adult-accent transition-colors">Área Administrativa</Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-adult-purple border-opacity-20 text-center space-y-2">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Asmodelos. Todos os direitos reservados. Apenas para adultos maiores de 18 anos.
          </p>
          <p className="text-xs text-gray-500">
            Este site é destinado apenas a adultos maiores de 18 anos. Ao acessar este site, você concorda em cumprir todas as leis aplicáveis relacionadas a conteúdo adulto.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
