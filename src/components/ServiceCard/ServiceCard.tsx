// src/components/ServiceCard/ServiceCard.tsx
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ServiceCardProps } from "./types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceDetailsDrawer } from "@/components/ServiceDetailsDrawer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";

export const ServiceCard: React.FC<ServiceCardProps> = ({
  companySector,
  tags,
  serviceTitle,
  city,
  state,
  postedDaysAgo,
  description,
  service,
  company,
  className
}) => {
  return (
    <Card className={`bg-white flex flex-col ${className}`}>
      <CardHeader className="flex items-center gap-4 flex-row">

        <Avatar className="mt-3 shadow-lg w-16 h-16">
          <AvatarImage width={64} height={64} src={company?.profileImageUrl} alt={`${company?.name} logo`} />
          <AvatarFallback className="uppercase">
            {company ? getInitials(company.name) : "EM"}
          </AvatarFallback>
        </Avatar>

        <div>
          <CardTitle className="text-lg font-bold">{company?.name || "Empresa"}</CardTitle>
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
          {city} - {state} / {postedDaysAgo > 0 ? `postada há ${postedDaysAgo} dias` : "hoje"}
        </p>

        <p className="text-base text-black mb-4 line-clamp-3">
          {description}
        </p>
      </CardContent>

      <CardFooter>
        {/* Adiciona o Drawer aqui */}
        <ServiceDetailsDrawer service={service} company={company} />
      </CardFooter>
    </Card>
  );
};
