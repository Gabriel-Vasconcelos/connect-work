"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/services/firebase.config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, Filter } from "lucide-react";
import Menu from "@/components/Menu/Menu";
import { ServiceFormData } from "../myservices/new/types";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ServiceCard } from "@/components/ServiceCard/ServiceCard"; // Ajuste o caminho conforme necessário

export default function Feed() {
  const [serviceTitle, setServiceTitle] = useState("");
  const [companySector, setCompanySector] = useState("");
  const [model, setModel] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [tags, setTags] = useState("");
  const [services, setServices] = useState<ServiceFormData[]>([]);
  const [allServices, setAllServices] = useState<ServiceFormData[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controle do Dialog

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true); // Define o estado de carregamento como verdadeiro
      try {
        const serviceCollection = collection(db, "services");
        const querySnapshot = await getDocs(serviceCollection);
        const fetchedServices = querySnapshot.docs.map((doc) => {
          const data = doc.data() as ServiceFormData;
          if (data.createdAt instanceof Timestamp) {
            data.createdAt = data.createdAt.toDate();
          }
          return data;
        });

        // Ordena os serviços pela data de criação mais recente
        fetchedServices.sort((a, b) => (b.createdAt as Date).getTime() - (a.createdAt as Date).getTime());

        setAllServices(fetchedServices);
        setServices(fetchedServices); // Inicialmente exibe todos os serviços
      } catch (error) {
        console.error("Erro ao buscar os serviços: ", error);
      } finally {
        setLoading(false); // Define o estado de carregamento como falso após o término da busca
      }
    };

    fetchServices();
  }, []);

  const handleFilter = () => {
    console.log("Valores dos filtros:", { serviceTitle, companySector, model, city, state, tags });

    const isFiltersEmpty =
      !serviceTitle &&
      !companySector &&
      !model &&
      !city &&
      !state &&
      !tags;

    if (isFiltersEmpty) {
      setServices(allServices);
      setIsDialogOpen(false); // Fechar o Dialog se não houver filtros preenchidos
      return;
    }

    const filtered = allServices.filter((service) => {
      const matchesServiceTitle = serviceTitle
        ? service.serviceTitle.toLowerCase().includes(serviceTitle.toLowerCase())
        : false;

      const matchesCompanySector = companySector
        ? service.companySector.toLowerCase().includes(companySector.toLowerCase())
        : false;

      const matchesModel = model
        ? service.model.toLowerCase().includes(model.toLowerCase())
        : false;

      const matchesCity = city
        ? service.city.toLowerCase().includes(city.toLowerCase())
        : false;

      const matchesState = state
        ? service.state.toLowerCase().includes(state.toLowerCase())
        : false;

      const matchesTags = tags
        ? tags
          .split(",")
          .map((tag) => tag.trim().toLowerCase())
          .some((tag) =>
            Array.isArray(service.tags)
              ? service.tags.some((serviceTag) =>
                serviceTag.toLowerCase().includes(tag)
              )
              : false
          )
        : false;

      return (
        matchesServiceTitle ||
        matchesCompanySector ||
        matchesModel ||
        matchesCity ||
        matchesState ||
        matchesTags
      );
    });

    console.log("Serviços filtrados:", filtered);
    setServices(filtered);
    setIsDialogOpen(false); // Fechar o Dialog após o filtro
  };

  return (
    <div className="flex">
      <Menu />

      <div className="flex-1 pt-28 md:pt-6 pl-4 pr-4 md:pl-60 md:pr-4 bg-[#082F49] min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Título com Ícone e Linha Centralizado */}
          <div className="flex flex-col items-center mb-14 md:mt-8">
            <div className="flex items-center mb-2">
              <FileText className="text-white mr-2" size={26} />
              <h1 className="text-3xl font-bold text-white">Feed de Serviços</h1>
            </div>
            <div className="w-72 border-b-2 border-white"></div>
          </div>

          {/* Botão de Filtrar Serviços */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="mb-4 text-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-700 transition duration-200 flex items-center ml-auto mr-5"
                onClick={() => setIsDialogOpen(true)}
              >
                <Filter className="mr-2" size={20} /> {/* Adicione o ícone */}
                Filtros
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Filtrar Serviços</DialogTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Título do Serviço"
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                />
                <Input
                  placeholder="Setor da Empresa"
                  value={companySector}
                  onChange={(e) => setCompanySector(e.target.value)}
                />
                <Input
                  placeholder="Modelo (Presencial/Remoto)"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
                <Input
                  placeholder="Cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  placeholder="Estado"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <Input
                  placeholder="Tags (separadas por vírgula)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              <Button
                className="mt-4 bg-cyan-500 rounded-full font-semibold hover:bg-cyan-700 transition duration-200 text-lg"
                onClick={handleFilter}
              >
                Filtrar
              </Button>
            </DialogContent>
          </Dialog>

          {/* Exibição dos Serviços */}
          <div className="mt-12 mb-4">
            {loading ? (
              <p className="text-white font-bold text-center text-2xl">Buscando os serviços, aguarde...</p>
            ) : services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-16 mx-5">
                {services.map((service, index) => {
                  const createdAtDate = service.createdAt instanceof Timestamp
                    ? service.createdAt.toDate()
                    : (service.createdAt as Date);

                  const postedDaysAgo = Math.floor((Date.now() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24));

                  return (
                    <ServiceCard
                      key={index}
                      imageSrc="/assets/Saly-10.png" // Ajuste conforme seus dados
                      companyName={"Empresa teste" || "Empresa teste"}
                      companySector={service.companySector || "Financeiro"}
                      tags={Array.isArray(service.tags) ? service.tags : service.tags ? service.tags.split(",").map(tag => tag.trim()) : []}
                      serviceTitle={service.serviceTitle}
                      city={service.city}
                      state={service.state}
                      postedDaysAgo={postedDaysAgo}
                      description={service.description || ""}
                      className="aspect-w-1 aspect-h-1"
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-white text-center">Nenhum serviço encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
