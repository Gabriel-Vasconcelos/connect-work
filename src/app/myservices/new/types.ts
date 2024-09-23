export type ServiceFormData = {
  serviceTitle: string;
  companySector: string;
  model: string;
  city: string;
  state: string;
  contact: string;
  tags: string;
  description: string;
  createdAt?: Date;
  userId: string;
  imageSrc?: string;  // Propriedade adicionada
  companyName?: string;  // Propriedade adicionada
}

// Novo tipo para os dados da empresa
export type CompanyData = {
  name: string;
  profileImageUrl: string;
};

// Tipo que combina ServiceFormData com os dados da empresa
export type ServiceWithCompanyData = ServiceFormData & {
  id: string;
  companyData: CompanyData | null;
};