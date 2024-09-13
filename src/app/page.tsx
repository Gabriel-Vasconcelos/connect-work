import { FiftyFifty } from "@/components/FiftyFifty";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col gap-y-20 mb-8">
      <Hero />
      <FiftyFifty image="/assets/business-woman.png" imagePosition="left" title="Sobre" subtitle="Conectando Negócios, Transformando Resultados" description="Nossa plataforma conecta pessoas e empresas que procuram fornecer seus serviços com aquelas que necessitam de serviços específicos, criando um ecossistema eficiente e confiável para ambas as partes. Oferecemos uma solução integrada que facilita a busca, contratação e gestão de serviços." />
      <FiftyFifty className="bg-sky-950 text-white" image="/assets/illustration-1.png" imagePosition="right" title="Porque escolher a Connect Work?" description="A Connect Work não é apenas mais uma plataforma de conexão de serviços—é a solução que sua empresa precisa para transformar desafios em oportunidades. Escolher a ConnectWork significa optar por eficiência e resultados que realmente fazem a diferença." />
      <p className="mx-auto -mt-10 text-gray-600">Connect Work 2024 © </p>
    </main>
  );
}
