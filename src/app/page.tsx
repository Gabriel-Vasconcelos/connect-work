import { ContactForm } from "@/components/ContactForm";
import { FeaturedEnterprises } from "@/components/FeaturedEnterprises";
import { FeaturedServicesCarousel } from "@/components/FeaturedServicesCarousel";
import { FeaturedText } from "@/components/FeaturedText";
import { FiftyFifty } from "@/components/FiftyFifty";
import { Hero } from "@/components/Hero";
import { OurPlans } from "@/components/OurPlans";
import { UnauthenticatedHeader } from "@/components/UnauthenticatedHeader";

export default function Home() {
  return (
    <div className="mb-8 w-full">
      <Hero />
      <div className="max-xl:mt-5">
        <FeaturedEnterprises />
      </div>

      <FiftyFifty className="mb-20" image="/assets/business-woman.png" imagePosition="left" title="Sobre" subtitle="Conectando Negócios, Transformando Resultados" description="Nossa plataforma conecta pessoas e empresas que procuram fornecer seus serviços com aquelas que necessitam de serviços específicos, criando um ecossistema eficiente e confiável para ambas as partes. Oferecemos uma solução integrada que facilita a busca, contratação e gestão de serviços." />
      {/* <FiftyFifty className="bg-sky-950 text-white" image="/assets/illustration-1.png" imagePosition="right" title="Porque escolher a Connect Work?" description="A Connect Work não é apenas mais uma plataforma de conexão de serviços—é a solução que sua empresa precisa para transformar desafios em oportunidades. Escolher a ConnectWork significa optar por eficiência e resultados que realmente fazem a diferença." /> */}
      <div id="question">
        <FeaturedText imageSrc="/assets/group-people.png" title="Por que escolher a ConnectWork?" description="A ConnectWork não é apenas mais uma plataforma de conexão de serviços—é a solução que sua empresa precisa para transformar desafios em oportunidades. Escolher a ConnectWork significa optar por eficiência, segurança e resultados que realmente fazem a diferença." />
      </div>
      <div className="mt-10 lg:mt-20">
        <OurPlans />
      </div>
      <FeaturedServicesCarousel />
      <div id="contact">
        <ContactForm />
      </div>

      <footer className="text-center mx-auto mt-10 text-gray-600">Connect Work 2024 © </footer>

    </div>
  );
}
