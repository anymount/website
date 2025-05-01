import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

const TawkToChat = () => {
  useEffect(() => {
    // Configuração do Tawk.to
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Configurações de posicionamento
    window.Tawk_API.customStyle = {
      zIndex: 1000,
      position: 'left' // Pode ser 'left' ou 'right'
    };

    // Carrega o script do Tawk.to
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/673eb7204304e3196ae60487/1id6fmlmf';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Adiciona o script ao documento
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);

    // Cleanup quando o componente for desmontado
    return () => {
      script.remove();
      delete window.Tawk_API;
      delete window.Tawk_LoadStart;
    };
  }, []);

  return null; // Este componente não renderiza nada visualmente
};

export default TawkToChat; 