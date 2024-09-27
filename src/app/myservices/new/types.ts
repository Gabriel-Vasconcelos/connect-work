export interface ServiceFormData {
  description: string;
  serviceTitle: string;
  state: string;
  companySector: string;
  contact: string;
  model: string;
  userId: string;
  tags: string;
  createdAt: Date | string;
  city: string;
  service: any; // Referência ao próprio serviço
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
}
