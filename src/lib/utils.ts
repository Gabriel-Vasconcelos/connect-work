import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para pegar as iniciais
export const getInitials = (name: string) => {
  const words = name.split(' ');
  if (words.length === 1) {
    return (words[0].charAt(0) + words[0].charAt(1)).toUpperCase();
  } else {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }
};