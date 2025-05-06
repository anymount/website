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
            <h2 className="text-2xl font-semibold text-adult-accent mb-2">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar ou utilizar o site Asmodelos, você concorda em cumprir estes Termos de Serviço e todas as leis e regulamentos aplicáveis. Caso não concorde com algum termo, por favor, não utilize o site.
            </p>
            <h2 className="text-2xl font-semibold text-adult-accent mb-2">2. Restrição de Idade</h2>
            <p>
              O acesso e uso deste site são permitidos apenas para maiores de 18 anos. Ao utilizar o site, você declara ser maior de idade conforme a legislação de sua jurisdição.
            </p>
            <h2 className="text-2xl font-semibold text-adult-accent mb-2">3. Uso do Serviço</h2>
            <p>
              O Asmodelos oferece uma plataforma para divulgação e venda de acesso a grupos exclusivos do Telegram para adultos. O usuário é responsável por todas as informações fornecidas e pelo uso adequado do serviço.
            </p>
            <h2 className="text-2xl font-semibold text-adult-accent mb-2">4. Conteúdo e Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo do site, incluindo textos, imagens, marcas e logotipos, é protegido por direitos autorais e não pode ser reproduzido sem autorização prévia.
            </p>
            <h2 className="text-2xl font-semibold text-adult-accent mb-2">5. Pagamentos e Reembolsos</h2>
            <p>
              As compras realizadas no site são processadas de forma segura. O usuário deve revisar as condições de pagamento e reembolso antes de efetuar qualquer transação. Em caso de dúvidas, entre em contato pelo suporte.
            </p>
            <h2 className="text-2xl font-semibold text-adult-accent mb-2">6. Cancelamento e Suspensão</h2>
            <p>
              Reservamo-nos o direito de cancelar ou suspender o acesso de qualquer usuário que viole estes termos ou utilize o site de forma inadequada, sem aviso prévio.
            </p>
            <h2 className="text-2xl font-semibold text-adult-accent mb-2">7. Limitação de Responsabilidade</h2>
            <p>
              O Asmodelos não se responsabiliza por danos diretos, indiretos ou incidentais decorrentes do uso ou da impossibilidade de uso do site, incluindo acesso a grupos de terceiros.
            </p>
            <h2 className="text-2xl font-semibold text-adult-accent mb-2">8. Privacidade</h2>
            <p>
              As informações pessoais fornecidas pelos usuários são tratadas conforme nossa Política de Privacidade. Recomendamos a leitura atenta desse documento.
            </p>
            <h2 className="text-2xl font-semibold text-adult-accent mb-2">9. Alterações nos Termos</h2>
            <p>
              Estes Termos de Serviço podem ser alterados a qualquer momento, a critério do Asmodelos. As alterações entram em vigor imediatamente após a publicação no site.
            </p>
            <h2 className="text-2xl font-semibold text-adult-accent mb-2">10. Contato</h2>
            <p>
              Em caso de dúvidas, sugestões ou solicitações, entre em contato pelo e-mail: <a href="mailto:suporte@asmodelos.shop" className="text-adult-accent underline">suporte@asmodelos.shop</a>.
            </p>
            <h2 className="text-2xl font-semibold text-adult-accent mb-2">11. Legislação Aplicável</h2>
            <p>
              Estes termos são regidos pelas leis brasileiras. Qualquer disputa será submetida ao foro da comarca do usuário.
            </p>
            <p className="mt-6 text-sm text-gray-500">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
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