export interface RegisterFormData {
  cnpj: string;
  name: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  description: string;
  profilePic: string;
  website: string;
  instagram: string;
  linkedin: string;
  whatsapp: string;
  isSubscribed: boolean;
  services: string[];
  password: string;
  confirmPassword: string;
}