"use client"

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase.config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ServiceFormData } from "../myservices/new/types";

export default function Feed() {
  const [serviceTitle, setServiceTitle] = useState("");
  const [companySector, setCompanySector] = useState("");
  const [model, setModel] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [tags, setTags] = useState("");
  const [services, setServices] = useState<ServiceFormData[]>([]);
  const [allServices, setAllServices] = useState<ServiceFormData[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const serviceCollection = collection(db, "services");
        const querySnapshot = await getDocs(serviceCollection);
        const fetchedServices = querySnapshot.docs.map((doc) => doc.data() as ServiceFormData);
        setAllServices(fetchedServices);
        setServices(fetchedServices); // Inicialmente exibe todos os serviços
      } catch (error) {
        console.error("Erro ao buscar os serviços: ", error);
      }
    };

    fetchServices();
  }, []);

  const handleFilter = () => {
    if (!serviceTitle && !companySector && !model && !city && !state && !tags) {
      // Nenhum filtro preenchido: mostrar todos os serviços
      setServices(allServices);
      return;
    }

    const filtered = allServices.filter((service) => {
      const matchesServiceTitle = serviceTitle
        ? service.serviceTitle.toLowerCase().includes(serviceTitle.toLowerCase())
        : true;
      const matchesCompanySector = companySector
        ? service.companySector.toLowerCase().includes(companySector.toLowerCase())
        : true;
      const matchesModel = model
        ? service.model.toLowerCase().includes(model.toLowerCase())
        : true;
      const matchesCity = city
        ? service.city.toLowerCase().includes(city.toLowerCase())
        : true;
      const matchesState = state
        ? service.state.toLowerCase().includes(state.toLowerCase())
        : true;

      // Ajuste para verificar as tags
      const matchesTags = tags
        ? tags
            .split(",")
            .some((tag) =>
              Array.isArray(service.tags)
                ? service.tags.some((serviceTag) =>
                    serviceTag.toLowerCase().includes(tag.trim().toLowerCase())
                  )
                : false
            )
        : true;

      return (
        matchesServiceTitle &&
        matchesCompanySector &&
        matchesModel &&
        matchesCity &&
        matchesState &&
        matchesTags
      );
    });

    setServices(filtered);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Filtrar Serviços</h2>

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

      <Button className="mt-4" onClick={handleFilter}>
        Filtrar
      </Button>

      <div className="mt-8">
        {services.length > 0 ? (
          <ul>
            {services.map((service, index) => (
              <li key={index} className="mb-4 p-4 border rounded">
                <h3 className="text-lg font-bold">{service.serviceTitle}</h3>
                <p>Setor: {service.companySector}</p>
                <p>Modelo: {service.model}</p>
                <p>Cidade: {service.city}</p>
                <p>Estado: {service.state}</p>
                <p>Contato: {service.contact}</p>
                <p>
                  Tags: {Array.isArray(service.tags) ? service.tags.join(", ") : service.tags}
                </p>
                <p>Descrição: {service.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum serviço encontrado com os filtros aplicados.</p>
        )}
      </div>
    </div>
  );
}
