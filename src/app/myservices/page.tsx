"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/services/firebase.config";
import { NotebookPen } from "lucide-react";
import Link from "next/link";  // Adicione o import para Link
import Menu from "@/components/Menu/Menu";
import { Button } from "@/components/ui/button";
import { ServiceFormData } from "../myservices/new/types";
import { ServiceCardUser } from "@/components/ServiceCardUser/ServiceCardUser";
import { PaginationComponent } from "@/components/Pagination/Pagination";

export default function MyServices() {
    const [services, setServices] = useState<(ServiceFormData & { id: string })[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 8;

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const auth = getAuth();
                auth.onAuthStateChanged(async (user) => {
                    if (user) {
                        const uid = user.uid;
                        const servicesRef = collection(db, "services");
                        const q = query(servicesRef, where("userId", "==", uid));
                        const querySnapshot = await getDocs(q);

                        const userServices: (ServiceFormData & { id: string })[] = [];
                        querySnapshot.forEach((doc) => {
                            const data = doc.data() as ServiceFormData;

                            if (data.createdAt instanceof Timestamp) {
                                data.createdAt = data.createdAt.toDate();
                            }

                            userServices.push({
                                ...data,
                                id: doc.id,
                                tags: data.tags,
                            });
                        });

                        userServices.sort((a, b) => (b.createdAt as Date).getTime() - (a.createdAt as Date).getTime());

                        setServices(userServices);
                    } else {
                        alert("Acesso negado.");
                    }
                    setLoading(false);
                });
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
                alert("Erro ao buscar serviços.");
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const totalPages = Math.ceil(services.length / servicesPerPage);
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = services.slice(indexOfFirstService, indexOfLastService);

    return (
        <div className="flex">
            <Menu />

            <div className="flex-1 pt-28 md:pt-6 pl-4 pr-4 md:pl-60 md:pr-4 bg-[#082F49] min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col items-center mb-14 md:mt-8">
                        <div className="flex items-center mb-2">
                            <NotebookPen className="text-white mr-2" size={26} />
                            <h1 className="text-3xl font-bold text-white">Meus Serviços</h1>
                        </div>
                        <div className="w-64 border-b-2 border-white"></div>
                    </div>

                    <div className="mt-12 mb-4">
                        {loading ? (
                            <p className="text-white font-bold text-center text-2xl">Buscando os serviços, aguarde...</p>
                        ) : (
                            services.length === 0 ? (
                                <div className="text-center">
                                    <p className="text-white font-bold text-2xl">Nenhum serviço encontrado, crie um novo serviço abaixo.</p>
                                    <Link href="/myservices/new">
                                        <Button className="mt-6 text-xl px-6 py-3 bg-cyan-500 hover:bg-cyan-700 text-white font-bold">
                                            Criar Serviço
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-16 mx-5">
                                    {currentServices.map((service) => {
                                        const createdAtDate = service.createdAt instanceof Timestamp
                                            ? service.createdAt.toDate()
                                            : (service.createdAt as Date);

                                        const postedDaysAgo = Math.floor((Date.now() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24));

                                        return (
                                            <ServiceCardUser
                                                key={service.id}
                                                serviceId={service.id}
                                                imageSrc="/assets/Saly-10.png"
                                                companyName="Empresa Teste"
                                                companySector={service.companySector}
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
                            )
                        )}
                    </div>

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
