// src/components/FeaturedServicesCarousel/FeaturedServicesCarousel.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/services/firebase.config";
import { ServiceCard } from "../ServiceCard/ServiceCard";
import { ServiceFormData } from "@/app/myservices/new/types";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export const FeaturedServicesCarousel = () => {
  const [services, setServices] = useState<ServiceFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

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
    const fetchFeaturedServices = async () => {
      setLoading(true);
      try {
        const serviceCollection = collection(db, "services");
        const querySnapshot = await getDocs(serviceCollection);
        const fetchedServices = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const companyData = await fetchCompanyData(data.userId);
            return {
              ...data,
              company: companyData,
            };
          })
        );

        // Filtra os serviços apenas das empresas que estão assinadas
        const filteredServices = fetchedServices.filter(service => service.company?.isSubscribed);

        setServices(filteredServices as ServiceFormData[]);
      } catch (error) {
        console.error("Erro ao buscar os serviços: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedServices();
  }, []);

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


  return (
    <section className="bg-sky-900">
      <div className="site--container py-20 flex flex-col justify-center items-center">
        <h2 className="text-white text-4xl font-bold mb-10">Serviços Destacados</h2>
        {loading ? (
          <p>Carregando serviços...</p>
        ) : services.length > 0 ? (
          <>
            <Carousel setApi={setApi} className=" w-full">
              <CarouselContent className="">
                {services.map((service, index) => {
                  const createdAtDate = service.createdAt instanceof Timestamp
                    ? service.createdAt.toDate()
                    : (service.createdAt as Date);

                  const postedDaysAgo = Math.floor((Date.now() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24));
                  return (
                    <CarouselItem className="lg:basis-1/2">
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
                      />
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious className="max-lg:hidden" />
              <CarouselNext className="max-lg:hidden" />
            </Carousel>
            <div className="mt-6 text-center text-lg text-white">
              {current} de {count}
            </div></>
        ) : (
          <p>Nenhum serviço destacado encontrado.</p>
        )}
      </div>
    </section>
  );
};
