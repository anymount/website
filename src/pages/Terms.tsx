import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold text-adult-accent mb-6">Termos de Serviço</h1>
          <div className="text-gray-300 text-left space-y-4 mb-8">
            <p>
              Bem-vindo ao Asmodelos! Ao acessar ou usar nosso site, você concorda com estes Termos de Serviço. Leia atentamente antes de utilizar nossos serviços.
            </p>
            <p>
              Este site é destinado apenas a adultos maiores de 18 anos. Ao utilizar o site, você declara que tem idade legal para acessar conteúdo adulto em sua jurisdição.
            </p>
            <p>
              Para o texto completo dos termos, acesse: <a href="https://asmodelos.shop/terms" target="_blank" rel="noopener noreferrer" className="text-adult-accent underline">https://asmodelos.shop/terms</a>
            </p>
            <p>
              O uso deste site está sujeito a todas as leis e regulamentos aplicáveis. Reservamo-nos o direito de modificar estes termos a qualquer momento.
            </p>
          </div>
          <Link to="/">
            <Button className="bg-adult-accent hover:bg-adult-magenta text-white">
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Terms; 