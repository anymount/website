
import React, { useState, useEffect, useCallback } from 'react';
import { Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CouponTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState<number>(300); // 5 minutos em segundos
  const [isCouponUsed, setIsCouponUsed] = useState<boolean>(false);
  const [couponCode] = useState<string>('DESCONTO20');

  const resetTimer = useCallback(() => {
    setTimeRemaining(300);
    setIsCouponUsed(false);
  }, []);

  useEffect(() => {
    // Verificar se o cupom já foi usado nesta sessão
    const usedCoupon = sessionStorage.getItem('couponUsed');
    if (usedCoupon === 'true') {
      setIsCouponUsed(true);
    }

    // Verificar tempo restante salvo
    const savedTime = localStorage.getItem('couponTimeRemaining');
    const savedTimestamp = localStorage.getItem('couponTimestamp');
    
    if (savedTime && savedTimestamp) {
      const elapsedSeconds = Math.floor((Date.now() - parseInt(savedTimestamp)) / 1000);
      const remainingTime = Math.max(0, parseInt(savedTime) - elapsedSeconds);
      
      if (remainingTime > 0) {
        setTimeRemaining(remainingTime);
      } else {
        // Se o tempo expirou, resetar
        resetTimer();
        localStorage.removeItem('couponTimeRemaining');
        localStorage.removeItem('couponTimestamp');
      }
    }

    // Iniciar o temporizador
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        
        // Salvar o tempo restante e o timestamp
        localStorage.setItem('couponTimeRemaining', newTime.toString());
        localStorage.setItem('couponTimestamp', Date.now().toString());
        
        if (newTime <= 0) {
          clearInterval(interval);
          resetTimer();
          localStorage.removeItem('couponTimeRemaining');
          localStorage.removeItem('couponTimestamp');
          return 300; // Reinicia para 5 minutos
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resetTimer]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const copyCoupon = () => {
    navigator.clipboard.writeText(couponCode);
    toast.success('Código de cupom copiado para a área de transferência!');
    setIsCouponUsed(true);
    sessionStorage.setItem('couponUsed', 'true');
  };

  if (isCouponUsed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm">
      <Card className="bg-adult-dark border border-adult-purple border-opacity-30 shadow-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-white font-semibold">Oferta Especial!</div>
          <div className="flex items-center text-adult-accent">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-3">
          Use o código <span className="text-adult-magenta font-mono bg-black/20 px-1 rounded">{couponCode}</span> e ganhe 20% de desconto em todos os grupos!
        </p>
        <div className="flex justify-end">
          <Button 
            onClick={copyCoupon} 
            variant="outline" 
            size="sm"
            className="border-adult-purple text-white hover:bg-adult-purple hover:bg-opacity-20"
          >
            Copiar Código
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CouponTimer;
