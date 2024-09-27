export type ServiceCardProps = {
  companySector: string;
  tags: string[];
  serviceTitle: string;
  city: string;
  state: string;
  description: string;
  service: any;
  company: {
    name: string;
    email: string;
    linkedin: string;
    description: string;
    whatsapp?: string;
    state: string;
    cnpj: string;
    city: string;
    instagram?: string;
    services?: string[];
    website?: string;
    createdAt?: {
      seconds: number;
      nanoseconds: number;
    };
    phone?: string;
    profileImageUrl?: string;
    isSubscribed?: boolean;
  };
  className?: string;
  postedDaysAgo: number;
};