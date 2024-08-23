import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connect Work",
  description: "Na Connect Work, facilitamos conexões entre empresas e simplificamos a busca por serviços especializados. Nosso objetivo é criar um ecossistema eficiente e confiável que impulsiona parcerias empresariais valiosas e duradouras. Descubra como podemos ajudar sua empresa a encontrar os serviços certos para crescer e prosperar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
