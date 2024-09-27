"use client";

import { useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { XIcon, Linkedin, Globe } from "lucide-react"; // Importando ícones
import { Separator } from "../ui/separator";
import { FaWhatsapp } from "react-icons/fa6";

interface ServiceDetailsDrawerProps {
  service: any;
  company: any;
}

export const ServiceDetailsDrawer: React.FC<ServiceDetailsDrawerProps> = ({ service, company }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Função para gerar a mensagem de contato
  const generateWhatsAppMessage = () => {
    return `Olá, vimos que sua empresa está solicitando o serviço de "${service.serviceTitle}". Gostaríamos de entender melhor suas necessidades e discutir como podemos ajudá-lo a alcançar seus objetivos. Poderíamos agendar um horário para conversar?`;
  };

  return (
    <>
      {company && service && (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button className="bg-cyan-500 font-semibold hover:bg-cyan-700 text-white w-full">
              Saiba Mais
            </Button>
          </DrawerTrigger>

          <DrawerContent className="h-[95vh]">
            <DrawerHeader>
              <DrawerClose className="ml-auto">
                <Button variant="outline">
                  <XIcon />
                </Button>
              </DrawerClose>
            </DrawerHeader>

            <div className="pb-10 overflow-y-auto">
              {/* Seção de informações da empresa */}
              <div className="flex flex-col p-6 space-y-6">
                <div className="flex items-center gap-4">
                  {/* Foto da empresa */}
                  {company.profileImageUrl ? (
                    <img
                      src={company.profileImageUrl}
                      alt={`${company.name} logo`}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200" />
                  )}

                  {/* Nome, localização, email e CNPJ */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{company.name}</h2>
                    <p className="text-sm text-gray-500">{company.city}, {company.state}</p>
                    {company.email && (
                      <p className="text-sm text-gray-500">Email: {company.email}</p>
                    )}
                    <p className="text-sm text-gray-500">CNPJ: {company.cnpj}</p>
                  </div>
                </div>

                {/* Descrição da empresa */}
                <p className="text-base text-gray-600 leading-relaxed">{company.description}</p>

                {/* Ícones de contato */}
                <div className="flex items-center gap-6">
                  {company.website && (
                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-6 h-6 text-cyan-500 hover:text-cyan-700" />
                    </a>
                  )}
                  {company.linkedin && (
                    <a href={company.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-6 h-6 text-cyan-500 hover:text-cyan-700" />
                    </a>
                  )}
                </div>
              </div>

              <Separator />

              {/* Seção de informações do serviço */}
              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-4xl font-bold text-gray-800">{service.serviceTitle}</h3>

                {/* Tags do serviço */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {service.tags.map((tag: string) => (
                    <span key={tag} className="bg-cyan-500 text-white text-sm px-3 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600">
                  <strong>Localização:</strong> {service.city}, {service.state}
                </p>
                <p className="text-gray-600">
                  <strong>Modelo:</strong> {service.model}
                </p>
                <p className="text-gray-600">
                  <strong>Setor:</strong> {service.companySector}
                </p>

                <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap">{service.description}</p>

                {/* Botões de ação */}
                <div className="flex items-center gap-4">
                  {/* <Button className="bg-sky-500 text-white">
                    Chat com a empresa
                  </Button> */}
                  {company.phone && (
                    <Button className="bg-sky-500 lg:hover:bg-sky-600 text-white">
                      <a className="flex items-center gap-x-2" href={`https://wa.me/${company.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(generateWhatsAppMessage())}`} target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp className="w-6 h-6" /> Contato via WhatsApp
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
