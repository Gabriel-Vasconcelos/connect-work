import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceCardUserProps } from "./types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
    className
}) => {
    const handleEdit = () => {
        // Navegar para a página de edição ou abrir um modal
        window.location.href = `/myservices/edit/${serviceId}`;
    };

    const handleDelete = () => {
        // Lógica para excluir o serviço
        console.log("Excluir serviço com ID:", serviceId);
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
                <button onClick={handleDelete} className="text-red-500 font-semibold md:text-md hover:text-red-700 w-1/2 hover:border-red-500">
                    Excluir
                </button>
            </CardFooter>
        </Card>
    );
};
