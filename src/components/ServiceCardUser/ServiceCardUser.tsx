"use client"

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceCardUserProps } from "./types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/services/firebase.config";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const ServiceCardUser: React.FC<ServiceCardUserProps> = ({
    imageSrc,
    companyName,
    companySector,
    tags,
    serviceTitle,
    city,
    state,
    description,
    serviceId, // Adiciona o ID do serviço
    className,
    fetchServices
}) => {

    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false); // Controla a visibilidade do diálogo
    const [isDeleting, setIsDeleting] = useState(false); // Estado para indicar que a exclusão está em andamento

    const handleEdit = () => {

        router.push(`/myservices/edit/${serviceId}`);
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true); // Indica que a exclusão está em andamento
            // Exclui o documento do Firestore com base no ID do serviço
            await deleteDoc(doc(db, "services", serviceId));
            console.log("Serviço excluído com sucesso:", serviceId);
            setOpenDialog(false); // Fecha o diálogo após a exclusão
            await fetchServices();
        } catch (error) {
            console.error("Erro ao excluir o serviço:", error);
        } finally {
            setIsDeleting(false); // Restaura o estado após a tentativa de exclusão
        }
    };

    return (
        <Card className={`bg-white flex flex-col ${className}`}>
            <CardHeader className="flex items-center gap-4 flex-row">
                <Image
                    src={imageSrc}
                    alt={`${companyName} logo`}
                    className="w-16 h-16 rounded-full"
                    width={64}
                    height={64}
                    quality={100}
                    sizes="(max-width: 64px) 100vw, 64px"
                />
                <div>
                    <CardTitle className="text-lg font-bold">{companyName}</CardTitle>
                    <p className="text-sm text-gray-600">{companySector}</p>
                </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2 mb-2">
                    {tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <Badge key={index} className="bg-cyan-800 hover:bg-cyan-500 text-white rounded">
                                {tag}
                            </Badge>
                        ))
                    ) : (
                        <p className="text-gray-500">Nenhuma tag disponível</p>
                    )}
                </div>

                <h3 className="text-xl font-semibold text-black mb-2">{serviceTitle}</h3>

                <p className="text-sm text-gray-500 mb-2">
                    {city} - {state}
                </p>

                <p className="text-base text-black mb-4 line-clamp-3">
                    {description}
                </p>
            </CardContent>

            <CardFooter className="flex justify-between">
                <Button onClick={handleEdit} className="bg-cyan-500 text-white font-semibold md:text-md hover:bg-cyan-700 w-1/2">
                    Editar
                </Button>
                {/* Botão para abrir o diálogo de exclusão */}
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                        <button className="text-red-500 font-semibold md:text-md hover:text-red-700 w-1/2 hover:border-red-500">
                            Excluir
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirmar exclusão</DialogTitle>
                        </DialogHeader>
                        <p>Tem certeza de que deseja excluir este serviço?</p>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                                Cancelar
                            </Button>
                            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                                {isDeleting ? "Excluindo..." : "Excluir"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
};
