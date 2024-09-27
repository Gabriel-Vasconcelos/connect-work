"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, Timestamp, doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase.config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, Filter, Search } from "lucide-react";
import Menu from "@/components/Menu/Menu";
import { ServiceFormData } from "../myservices/new/types";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ServiceCard } from "@/components/ServiceCard/ServiceCard"; // Ajuste o caminho conforme necessário
import { PaginationComponent } from "@/components/Pagination/Pagination"; // Componente de Paginação

export default function Feed() {
  const [searchTitle, setSearchTitle] = useState(""); // Novo estado para a busca por título
  const [companySector, setCompanySector] = useState("");
  const [model, setModel] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [tags, setTags] = useState("");
  const [services, setServices] = useState<ServiceFormData[]>([]);
  const [allServices, setAllServices] = useState<ServiceFormData[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controle do Dialog
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const servicesPerPage = 8; // Defina quantos serviços por página

  // Função para buscar os dados da empresa com base no userId
  const fetchCompanyData = async (userId: string) => {
    try {
      const companyDoc = await getDoc(doc(db, "companies", userId));
      if (companyDoc.exists()) {
        return companyDoc.data();
      } else {
        console.error(`Empresa com ID ${userId} não encontrada`);
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar a empresa:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true); // Define o estado de carregamento como verdadeiro
      try {
        const serviceCollection = collection(db, "services");
        const querySnapshot = await getDocs(serviceCollection);
        const fetchedServices = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data() as ServiceFormData;
            if (data.createdAt instanceof Timestamp) {
              data.createdAt = data.createdAt.toDate();
            }

            // Busca os dados da empresa associada ao serviço
            const companyData = await fetchCompanyData(data.userId);
            return {
              ...data,
              company: companyData
            };
          })
        );

        // Ordena os serviços pela data de criação mais recente
        fetchedServices.sort((a, b) => (b.createdAt as Date).getTime() - (a.createdAt as Date).getTime());

        setAllServices(fetchedServices as ServiceFormData[]);
        setServices(fetchedServices as ServiceFormData[]); // Inicialmente exibe todos os serviços
      } catch (error) {
        console.error("Erro ao buscar os serviços: ", error);
      } finally {
        setLoading(false); // Define o estado de carregamento como falso após o término da busca
      }
    };

    fetchServices();
  }, []);

  const handleSearch = () => {
    const filtered = allServices.filter((service) =>
      service.serviceTitle.toLowerCase().includes(searchTitle.toLowerCase())
    );
    setServices(filtered);
  };

  const handleFilter = () => {
    console.log("Valores dos filtros:", { companySector, model, city, state, tags });

    const isFiltersEmpty = !companySector && !model && !city && !state && !tags;

    if (isFiltersEmpty) {
      setServices(allServices);
      setIsDialogOpen(false); // Fechar o Dialog se não houver filtros preenchidos
      return;
    }

    const filtered = allServices.filter((service) => {
      const matchesCompanySector = companySector
        ? service.companySector.toLowerCase().includes(companySector.toLowerCase())
        : false;

      const matchesModel = model
        ? service.model.toLowerCase().includes(model.toLowerCase())
        : false;

      const matchesCity = city
        ? city.toLowerCase().split(" ").some(part => service.city.toLowerCase().includes(part))
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

  // Lógica de paginação
  const totalPages = Math.ceil(services.length / servicesPerPage);
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

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

          {/* Campo de Busca por Título e Botão de Filtrar Serviços */}
          <div className="flex items-center mb-4 space-x-4 mr-5">
            <div className="relative w-full ml-5">
              <Input
                placeholder="Busque pelo nome do serviço"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="text-black pl-2 pr-8"
              />
              <Search
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
                onClick={handleSearch} // Usa a função handleSearch ao clicar no ícone
                style={{ cursor: "pointer" }} // Muda o cursor ao passar sobre o ícone
              />
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="text-md md:text-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-700 transition duration-200 flex items-center"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Filter className="mr-2 justify-end" size={20} /> {/* Adicione o ícone */}
                  Filtros
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Filtrar Serviços</DialogTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="mt-4 bg-cyan-500 font-semibold hover:bg-cyan-700 transition duration-200 text-lg"
                  onClick={handleFilter}
                >
                  Filtrar
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          {/* Exibição dos Serviços */}
          <div className="mt-12 mb-4">
            {loading ? (
              <p className="text-white font-bold text-center text-2xl">Buscando os serviços, aguarde...</p>
            ) : currentServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-16 mx-5">
                {currentServices.map((service, index) => {
                  const createdAtDate = service.createdAt instanceof Timestamp
                    ? service.createdAt.toDate()
                    : (service.createdAt as Date);

                  const postedDaysAgo = Math.floor((Date.now() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24));

                  return (
                    <ServiceCard
                      key={index}
                      service={service}
                      company={service.company}
                      companySector={service.companySector || "Financeiro"}
                      tags={Array.isArray(service.tags) ? service.tags : []}
                      serviceTitle={service.serviceTitle}
                      city={service.city || "Cidade teste"}
                      state={service.state || "SP"}
                      description={service.description}
                      postedDaysAgo={postedDaysAgo}
                      className="aspect-w-1 aspect-h-1"
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-white font-bold text-center text-2xl">Nenhum serviço encontrado.</p>
            )}
          </div>

          {/* Componente de Paginação */}
          {services.length > servicesPerPage && (
            <div className="mt-12 mb-12 text-white">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>

          )}
        </div>
      </div>
    </div>
  );
}
