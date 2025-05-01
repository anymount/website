import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const nomes = [
  'Pedro', 'João', 'Maria', 'Ana', 'Lucas', 'Gabriel', 'Julia', 'Mariana',
  'Rafael', 'Bruno', 'Carla', 'Diego', 'Eduardo', 'Fernanda', 'Gustavo',
  'Helena', 'Igor', 'Jessica', 'Karina', 'Leonardo'
];

const grupos = [
  'Premium VIP', 'Gold', 'Diamond', 'Platinum', 'Elite',
  'Master', 'Supreme', 'Ultimate', 'Royal', 'Exclusive'
];

interface Compra {
  nome: string;
  grupo: string;
  timestamp: number;
}

const PurchaseNotification = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const gerarCompraAleatoria = () => {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const grupo = grupos[Math.floor(Math.random() * grupos.length)];
    return { nome, grupo, timestamp: Date.now() };
  };

  useEffect(() => {
    // Gera uma compra inicial após 5 segundos
    const initialTimeout = setTimeout(() => {
      setCompras([gerarCompraAleatoria()]);
      setIsVisible(true);
    }, 5000);

    // Gera novas compras a cada 15-30 segundos
    const interval = setInterval(() => {
      setCompras(prev => {
        const novaCompra = gerarCompraAleatoria();
        return [novaCompra, ...prev].slice(0, 1); // Mantém apenas a compra mais recente
      });
      setIsVisible(true);
    }, Math.random() * (30000 - 15000) + 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isVisible, compras]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isVisible && compras.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-gray-900 text-white rounded-lg shadow-lg p-4 max-w-sm border border-adult-accent"
          >
            <div className="flex items-center gap-3">
              <div className="bg-adult-accent/20 p-2 rounded-full">
                <ShoppingCart className="w-4 h-4 text-adult-accent" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-semibold text-adult-accent">
                    {compras[0].nome}
                  </span>{' '}
                  acabou de comprar acesso ao grupo{' '}
                  <span className="font-semibold text-adult-accent">
                    {compras[0].grupo}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  agora mesmo
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchaseNotification; 