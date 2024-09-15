import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceCardProps } from "./types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const ServiceCard: React.FC<ServiceCardProps> = ({
    imageSrc,
    companyName,
    companySector,
    tags,
    serviceTitle,
    city,
    postedDaysAgo,
    description,
    className
}) => {
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

            <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => (
                        <Badge key={index} className="bg-blue-500 text-white rounded-full">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <h3 className="text-xl font-semibold text-black mb-2">{serviceTitle}</h3>

                <p className="text-sm text-gray-500 mb-2">
                    {city} / postada há {postedDaysAgo} dias
                </p>

                <p className="text-base text-black mb-4 line-clamp-3">
                    {description}
                </p>
            </CardContent>

            <CardFooter>
                <Button className="bg-blue-500 text-white w-full">
                    Saiba mais
                </Button>
            </CardFooter>
        </Card>
    );
};
