export type ServiceCardProps = {
    imageSrc?: string;
    companyName?: string;
    companySector: string;
    tags: string[];
    serviceTitle: string;
    city: string;
    state: string;
    postedDaysAgo: number;
    description: string;
    className?: string;
  };